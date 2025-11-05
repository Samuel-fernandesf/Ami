import React, { useState } from "react";
import { useModal } from "../modal/Modal";
import { useAuth } from "../../contexts/AuthContext";
import "./AuthForm.css";

/* ---------- máscaras e validação de CPF/telefone ---------- */
const maskCPF = (value) =>
  value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);

const maskPhone = (value) =>
  value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);

const validateCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0,
    resto;
  for (let i = 1; i <= 9; i++)
    soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10), 10)) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.substring(10, 11), 10);
};

/* converte File para base64 (usado só para preview & enviar como string) */
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });

/* helper para formatar data (YYYY-MM-DD -> DD-MM-YYYY) */
const formatDateToDDMMYYYY = (isoDate) => {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function RegisterForm({ firstInputRef }) {
  const { close } = useModal();
  const { register } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    confirmSenha: "",
    nome_completo: "",
    cpf: "",
    data_nasc: "",
    telefone: "",
    foto_perfil_file: null,
    foto_perfil_base64: null,
    cidade: "",
    bairro: "",
    habilidades: [],
    outrasHabilidades: "",
  });

  const habilidadesList = [
    "Mídias Sociais/Comunicação",
    "Organização de Eventos",
    "Reparo/Manutenção Básica",
    "Auxílio Educacional (Reforço)",
    "Distribuição de Alimentos",
    "Design Gráfico/Edição de Fotos",
    "Atendimento ao Público",
    "Suporte Administrativo",
    "Jardinagem/Cultivo",
    "Fotografia/Filmagem",
  ];

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files && files[0];
      if (file) {
        setFormData((p) => ({ ...p, foto_perfil_file: file }));
        try {
          const base64 = await fileToBase64(file);
          setFormData((p) => ({ ...p, foto_perfil_base64: base64 }));
        } catch (err) {
          console.error("Erro ao converter imagem:", err);
        }
      }
      return;
    }

    let maskedValue = value;
    if (name === "cpf") maskedValue = maskCPF(value);
    if (name === "telefone") maskedValue = maskPhone(value);

    setFormData((prev) => ({ ...prev, [name]: maskedValue }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      habilidades: checked
        ? [...prev.habilidades, value]
        : prev.habilidades.filter((h) => h !== value),
    }));
  };

  /* validação local por etapas */
  const validateStep1 = () => {
    const errs = {};
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
      errs.email = "Email inválido";
    if (!formData.senha || formData.senha.length < 6)
      errs.senha = "Senha deve ter ao menos 6 caracteres";
    if (formData.senha !== formData.confirmSenha)
      errs.confirmSenha = "Senhas não coincidem";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = async () => {
    const errs = {};
    const cpfDigits = formData.cpf.replace(/\D/g, "");
    if (!validateCPF(cpfDigits)) errs.cpf = "CPF inválido";
    if (!formData.nome_completo) errs.nome_completo = "Nome obrigatório";
    if (!formData.data_nasc) errs.data_nasc = "Data de nascimento obrigatória";
    if (!formData.telefone) errs.telefone = "Telefone obrigatório";
    if (!formData.foto_perfil_base64) errs.foto_perfil = "Adicione uma foto de perfil";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return false;

    // tentativa opcional de validar CPF via API externa; falha não bloqueante
    setLoading(true);
    try {
      const cpfDigits = formData.cpf.replace(/\D/g, "");
      const response = await fetch(`https://receitaws.com.br/v1/cpf/${cpfDigits}`);
      const data = await response.json();
      if (data.status && data.status === "ERROR") {
        console.warn("ReceitaWS: CPF não encontrado/erro");
      } else {
        console.log("ReceitaWS:", data.nome || "verificado");
      }
    } catch (err) {
      console.warn("ReceitaWS indisponível:", err);
    } finally {
      setLoading(false);
    }

    return true;
  };

  const nextStep = async () => {
    if (step === 1) {
      if (!validateStep1()) return;
    }
    if (step === 2) {
      const ok = await validateStep2();
      if (!ok) return;
    }
    setStep((s) => Math.min(4, s + 1));
  };

  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  /* envia para AuthContext.register (que por sua vez faz fetch /users) */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validação final
    if (!formData.foto_perfil_base64) {
      setErrors({ foto_perfil: "Foto de perfil obrigatória" });
      alert("Por favor, adicione uma foto de perfil antes de finalizar!");
      return;
    }

    const habilidadesFinal = [
      ...formData.habilidades,
      ...(formData.outrasHabilidades
        ? formData.outrasHabilidades.split(",").map((h) => h.trim())
        : []),
    ];

    const payload = {
      nome_completo: formData.nome_completo,
      cpf: formData.cpf.replace(/\D/g, ""), // só dígitos
      email: formData.email,
      cidade: formData.cidade,
      bairro: formData.bairro,
      telefone: formData.telefone.replace(/\D/g, ""), // só dígitos
      data_nasc: formatDateToDDMMYYYY(formData.data_nasc), // DD-MM-YYYY
      habilidades: habilidadesFinal,
      foto_perfil_PATH: formData.foto_perfil_base64, // base64 string
      senha: formData.senha,
    };

    setLoading(true);
    const res = await register(payload);
    setLoading(false);

    if (res.ok) {
      alert("Cadastro realizado com sucesso!");
      close();
    } else {
      alert("Erro ao cadastrar: " + (res.error || "Erro desconhecido"));
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2>Etapa 1: Dados de Acesso</h2>

            <label>Email:</label>
            <input
              ref={firstInputRef}
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              required
            />
            {errors.email && <small className="error">{errors.email}</small>}

            <label>Senha:</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={(e) => setFormData((p) => ({ ...p, senha: e.target.value }))}
              required
            />
            {errors.senha && <small className="error">{errors.senha}</small>}

            <label>Confirmar senha:</label>
            <input
              type="password"
              name="confirmSenha"
              value={formData.confirmSenha}
              onChange={(e) => setFormData((p) => ({ ...p, confirmSenha: e.target.value }))}
              required
            />
            {errors.confirmSenha && <small className="error">{errors.confirmSenha}</small>}

            <div style={{ marginTop: 12 }}>
              <button type="button" onClick={nextStep}>Próximo</button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2>Etapa 2: Informações Pessoais</h2>

            <label>Nome completo:</label>
            <input
              type="text"
              name="nome_completo"
              value={formData.nome_completo}
              onChange={(e) => setFormData((p) => ({ ...p, nome_completo: e.target.value }))}
              required
            />
            {errors.nome_completo && <small className="error">{errors.nome_completo}</small>}

            <label>CPF:</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={(e) => setFormData((p) => ({ ...p, cpf: maskCPF(e.target.value) }))}
              maxLength="14"
              required
            />
            {errors.cpf && <small className="error">{errors.cpf}</small>}

            <label>Data de Nascimento:</label>
            <input
              type="date"
              name="data_nasc"
              value={formData.data_nasc}
              onChange={(e) => setFormData((p) => ({ ...p, data_nasc: e.target.value }))}
              required
            />
            {errors.data_nasc && <small className="error">{errors.data_nasc}</small>}

            <label>Telefone:</label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData((p) => ({ ...p, telefone: maskPhone(e.target.value) }))}
              required
            />
            {errors.telefone && <small className="error">{errors.telefone}</small>}

            <label>Foto de Perfil:</label>
            <input
              type="file"
              name="foto_perfil"
              accept="image/*"
              onChange={handleChange}
              required
            />
            {formData.foto_perfil_base64 && (
              <small>Preview carregado (será enviado ao servidor).</small>
            )}
            {errors.foto_perfil && <small className="error">{errors.foto_perfil}</small>}

            {loading && <p>🔄 Validando CPF...</p>}

            <div style={{ marginTop: 12 }}>
              <button type="button" onClick={prevStep}>Anterior</button>
              <button type="button" onClick={nextStep} style={{ marginLeft: 8 }}>Próximo</button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2>Etapa 3: Localidade</h2>

            <label>Cidade:</label>
            <input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={(e) => setFormData((p) => ({ ...p, cidade: e.target.value }))}
              required
            />

            <label>Bairro:</label>
            <input
              type="text"
              name="bairro"
              value={formData.bairro}
              onChange={(e) => setFormData((p) => ({ ...p, bairro: e.target.value }))}
              required
            />

            <div style={{ marginTop: 12 }}>
              <button type="button" onClick={prevStep}>Anterior</button>
              <button type="button" onClick={nextStep} style={{ marginLeft: 8 }}>Próximo</button>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2>Etapa 4: Habilidades</h2>
            <fieldset>
              <legend>Selecione suas habilidades:</legend>
              {habilidadesList.map((hab, i) => (
                <label key={i} style={{ display: "block", marginBottom: "6px" }}>
                  <input
                    type="checkbox"
                    value={hab}
                    checked={formData.habilidades.includes(hab)}
                    onChange={handleCheckboxChange}
                  />
                  {hab}
                </label>
              ))}
            </fieldset>

            <label>Outras habilidades:</label>
            <input
              type="text"
              name="outrasHabilidades"
              placeholder="Liste outras habilidades, separadas por vírgula"
              value={formData.outrasHabilidades}
              onChange={(e) => setFormData((p) => ({ ...p, outrasHabilidades: e.target.value }))}
            />

            <div style={{ marginTop: 12 }}>
              <button type="button" onClick={prevStep}>Anterior</button>
              <button type="submit" style={{ marginLeft: 8 }}>Finalizar Cadastro</button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form" noValidate>
      <div className="step-indicator">
        <p>Etapa {step} de 4</p>
      </div>
      {renderStep()}
    </form>
  );
}