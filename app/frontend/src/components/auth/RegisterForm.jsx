import { useState } from 'react';

// Função auxiliar para aplicar máscara de CPF
const maskCPF = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);
};

// Função auxiliar para aplicar máscara de telefone
const maskPhone = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
};

// Validação de CPF (estrutura e dígitos)
const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
};

export default function RegisterForm() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        senha: '',
        confirmSenha: '',
        nome_completo: '',
        cpf: '',
        data_nasc: '',
        telefone: '',
        foto_perfil: null,
        cidade: '',
        bairro: '',
        habilidades: [],
        outrasHabilidades: ''
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        let maskedValue = value;

        if (name === 'cpf') maskedValue = maskCPF(value);
        if (name === 'telefone') maskedValue = maskPhone(value);

        if (type === 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: maskedValue }));
        }
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            habilidades: checked
                ? [...prev.habilidades, value]
                : prev.habilidades.filter(h => h !== value)
        }));
    };

    const nextStep = async () => {
        // Etapa 1 – valida senha
        if (step === 1) {
            if (formData.senha !== formData.confirmSenha) {
                alert("As senhas não coincidem!");
                return;
            }
        }

        // Etapa 2 – valida CPF
        if (step === 2) {
            const cpfSemMascara = formData.cpf.replace(/\D/g, '');
            if (!validateCPF(cpfSemMascara)) {
                alert("CPF inválido! Verifique e tente novamente.");
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`https://receitaws.com.br/v1/cpf/${cpfSemMascara}`);
                const data = await response.json();

                if (data.status === 'ERROR') {
                    console.warn("Validação ReceitaWS: CPF não encontrado ou inválido.");
                } else {
                    console.log("CPF válido e verificado:", data.nome);
                }
            } catch {
                console.warn("Não foi possível validar o CPF na API. Pode estar temporariamente fora do ar.");
            } finally {
                setLoading(false);
            }
        }

        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.foto_perfil) {
            alert("Por favor, adicione uma foto de perfil antes de finalizar o cadastro!");
            return;
        }

        const habilidadesFinal = [
            ...formData.habilidades,
            ...(formData.outrasHabilidades
                ? formData.outrasHabilidades.split(',').map(h => h.trim())
                : [])
        ];

        const dataToSend = {
            ...formData,
            habilidades: habilidadesFinal
        };

        localStorage.setItem('userData', JSON.stringify(dataToSend));

        console.log("Usuário cadastrado:", dataToSend);
        alert("✅ Cadastro realizado com sucesso!");
    };

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
        "Fotografia/Filmagem"
    ];

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h2>Etapa 1: Dados de Acesso</h2>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label>Senha:</label>
                        <input
                            type="password"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                        />

                        <label>Confirmar senha:</label>
                        <input
                            type="password"
                            name="confirmSenha"
                            value={formData.confirmSenha}
                            onChange={handleChange}
                            required
                        />

                        <button type="button" onClick={nextStep}>Próximo</button>
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
                            onChange={handleChange}
                            required
                        />

                        <label>CPF:</label>
                        <input
                            type="text"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            maxLength="14"
                            required
                        />

                        <label>Data de Nascimento:</label>
                        <input
                            type="date"
                            name="data_nasc"
                            value={formData.data_nasc}
                            onChange={handleChange}
                            required
                        />

                        <label>Telefone:</label>
                        <input
                            type="tel"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                        />

                        <label>Foto de Perfil:</label>
                        <input
                            type="file"
                            name="foto_perfil"
                            accept="image/*"
                            onChange={handleChange}
                            required
                        />

                        {loading && <p>🔄 Validando CPF...</p>}

                        <button type="button" onClick={prevStep}>Anterior</button>
                        <button type="button" onClick={nextStep}>Próximo</button>
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
                            onChange={handleChange}
                            required
                        />

                        <label>Bairro:</label>
                        <input
                            type="text"
                            name="bairro"
                            value={formData.bairro}
                            onChange={handleChange}
                            required
                        />

                        <button type="button" onClick={prevStep}>Anterior</button>
                        <button type="button" onClick={nextStep}>Próximo</button>
                    </>
                );

            case 4:
                return (
                    <>
                        <h2>Etapa 4: Habilidades</h2>
                        <fieldset>
                            <legend>Selecione suas habilidades:</legend>
                            {habilidadesList.map((hab, i) => (
                                <label key={i} style={{ display: 'block', marginBottom: '6px' }}>
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
                            onChange={handleChange}
                        />

                        <button type="button" onClick={prevStep}>Anterior</button>
                        <button type="submit">Finalizar Cadastro</button>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <div className="step-indicator">
                <p>Etapa {step} de 4</p>
            </div>
            {renderStep()}
        </form>
    );
}