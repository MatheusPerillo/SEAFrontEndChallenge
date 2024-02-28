import { Checkbox, Input, Radio, Select, Switch } from "antd";
import "./styles.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import type { CheckboxProps } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IForm {
  setIsEditing: (value: boolean) => void;
  setIsAdding: (value: boolean) => void;
  isAdding: boolean;
}

interface Epi {
  id: string;
  value?: string;
}

interface Atividade {
  id: string;
  epis: Epi[];
}

const Form = ({ setIsEditing, isAdding, setIsAdding }: IForm) => {
  const [atividades, setAtividades] = useState<Atividade[]>([
    { id: uuidv4(), epis: [{ id: uuidv4() }] },
  ]);
  const [isEpiAdded, setIsEpiAdded] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [fileName, setFileName] = useState(
    "Apenas arquivos .jpeg, .jpg, .png ou .pdf"
  );
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(1);
  const [status, setStatus] = useState(false);
  const [role, setRole] = useState("");
  const [usesEPI, setUsesEPI] = useState(false);
  const [healthCertificate, setHealthCertificate] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newUser = {
      name: name,
      cpf: cpf,
      rg: rg,
      dateOfBirth: dateOfBirth,
      gender: gender === 1 ? "Feminino" : "Masculino",
      status: status === false ? "Inativo" : "Ativo",
      role: role,
      usesEPI: usesEPI,
      healthCertificate: healthCertificate,
    };

    try {
      const response = await axios.post("http://localhost:5000/users", newUser);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleUpdate = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   const updatedUser = {
  //     name: name,
  //     cpf: cpf,
  //     rg: rg,
  //     dateOfBirth: dateOfBirth,
  //     gender: gender === 1 ? "Feminino" : "Masculino",
  //     status: status === false ? "Inativo" : "Ativo",
  //     role: role,
  //     usesEPI: usesEPI,
  //     healthCertificate: healthCertificate,
  //   };

  //   axios.put(`/user-update/${id}`, updatedUser)
  //   .then(response => {
  //     console.log(response.data);
  //     setIsEditing(false);
  //     setIsAdding(false);
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });

  //   try {
  //     const response = await axios.put(`http://localhost:5000/user-update/${id}`, updatedUser);
  //     console.log(response.data);
  //     setIsEditing(false);
  //     setIsAdding(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Suponha que 'id' é o ID do usuário que você deseja editar
  axios
    .get(`/user-update/:id`)
    .then((response) => {
      // 'response.data' é o objeto do usuário retornado pelo servidor
      const user = response.data;

      // Agora você pode usar os dados do usuário para preencher os estados do formulário
      setName(user.name);
      setCpf(user.cpf);
      setRg(user.rg);
      setDateOfBirth(user.dateOfBirth);
      setGender(user.gender === "Feminino" ? 1 : 2); // Supondo que 1 é para 'Feminino' e 2 é para 'Masculino'
      setStatus(user.status === "Ativo"); // Supondo que 'Ativo' é true e 'Inativo' é false
      setRole(user.role);
      setUsesEPI(user.usesEPI);
      setHealthCertificate(user.healthCertificate);
      setAtividades(user.activities);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  const handleBackClick = () => {
    setIsEditing(false);
    setIsAdding(false);
  };

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleAddEpi = (atividadeId: string) => {
    setAtividades(
      atividades.map((atividade) =>
        atividade.id === atividadeId
          ? {
              ...atividade,
              epis: [...atividade.epis, { id: uuidv4() }],
            }
          : atividade
      )
    );
    setIsEpiAdded(true);
  };

  const handleDeleteEpi = (atividadeId: string, epiId: string) => {
    setAtividades(
      atividades.map((atividade) =>
        atividade.id === atividadeId
          ? {
              ...atividade,
              epis: atividade.epis.filter((epi) => epi.id !== epiId),
            }
          : atividade
      )
    );

    if (
      atividades.find((atividade) => atividade.id === atividadeId)?.epis
        .length === 2
    ) {
      setIsEpiAdded(false);
    }
  };

  const handleAddAtividade = () => {
    setAtividades([...atividades, { id: uuidv4(), epis: [{ id: uuidv4() }] }]);
  };

  const handleDeleteAtividade = (atividadeId: string) => {
    setAtividades(
      atividades.filter((atividade) => atividade.id !== atividadeId)
    );
  };

  const onCheckedboxChange: CheckboxProps["onChange"] = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  return (
    <form className="form-global-container" onSubmit={handleSubmit}>
      <div className="form-header-container" onClick={handleBackClick}>
        <p className="form-header-text">
          <IoIosArrowRoundBack size="1.3em" color="white" /> Adicionar
          Funcionário
        </p>
      </div>
      <div className="switch-user-status-global-container">
        <div className="switch-user-status-container">
          <div className="switch-text-container">
            <p>O trabalhador está ativo ou inativo?</p>
          </div>
          <div className="switch-icon-container">
            <Switch
              checkedChildren="Ativo"
              unCheckedChildren="Inativo"
              onChange={(value) => setStatus(value)}
            />
          </div>
        </div>
      </div>
      <div className="user-infos-form-global-container">
        <div className="user-infos-form-container">
          <div className="user-infos-first-container">
            <div className="user-name-form-container">
              <p>Nome</p>
            </div>
            <div className="user-input-form">
              <Input
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="user-name-form-container">
              <p>CPF</p>
            </div>
            <div className="user-input-form">
              <Input
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>
            <div className="user-name-form-container">
              <p>RG</p>
            </div>
            <div className="user-input-form">
              <Input
                placeholder="0.000.000"
                value={rg}
                onChange={(e) => setRg(e.target.value)}
              />
            </div>
          </div>
          <div className="user-infos-second-container">
            <div className="user-name-form-container">
              <p>Sexo</p>
            </div>
            <div className="user-input-form">
              <Radio.Group
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <Radio value={1}>Feminino</Radio>
                <Radio value={2}>Masculino</Radio>
              </Radio.Group>
            </div>
            <div className="user-name-form-container">
              <p>Data de Nascimento</p>
            </div>
            <div className="user-input-form">
              <Input
                placeholder="00/00/0000"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="user-name-form-container">
              <p>Cargo</p>
            </div>
            <div className="user-input-form">
              <Select
                defaultValue="Escolha um cargo"
                style={{ width: "100%" }}
                value={role}
                onChange={(value) => setRole(value)}
                options={[
                  { value: "Cargo 1", label: "Cargo 1" },
                  { value: "Cargo 2", label: "Cargo 2" },
                  { value: "Cargo 3", label: "Cargo 3" },
                ]}
              />
            </div>
          </div>
        </div>
        {atividades.map((atividade) => (
          <div
            key={atividade.id}
            className={`user-security-equipment-container ${
              isCheckboxChecked ? "checked" : ""
            }`}
          >
            <div className="user-infos-equipment">
              <div
                className={`user-question-epi-container ${
                  isCheckboxChecked ? "checked" : ""
                }`}
              >
                <p>Quais EPIs o trabalhador usa na atividade?</p>
              </div>
              <div className="user-question-checkbox">
                <Checkbox
                  checked={usesEPI}
                  onChange={(e) => {
                    setUsesEPI(e.target.checked);
                    onCheckedboxChange(e);
                  }}
                >
                  O trabalhador não usa EPI.
                </Checkbox>
              </div>
              {!isCheckboxChecked && (
                <>
                  <div className="user-description-security-container">
                    <div className="user-activity-form-container">
                      <p>Selecione a atividade:</p>
                    </div>
                    <div className="user-activity-input-form">
                      <Select
                        defaultValue="Escolha uma atividade"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                        options={[
                          { value: "Atividade1", label: "Atividade 1" },
                          { value: "Atividade2", label: "Atividade 2" },
                          { value: "Atividade3", label: "Atividade 3" },
                        ]}
                      />
                    </div>
                    {atividade.epis.map((epi) => (
                      <div
                        key={epi.id}
                        className="user-security-equipment-epi-global-container"
                      >
                        <div className="user-security-equipment-epi-container">
                          <div className="user-security-equipment-text-container">
                            <p>Selecione o EPI:</p>
                          </div>
                          <div className="user-security-equipment-select-epi-container">
                            <Select
                              defaultValue="Escolha um EPI"
                              style={{ width: "100%" }}
                              onChange={handleChange}
                              options={[
                                {
                                  value: "Calçado de segurança",
                                  label: "Calçado de segurança",
                                },
                                { value: "Capacete", label: "Capacete" },
                                { value: "Luva", label: "Luva" },
                              ]}
                            />
                          </div>
                        </div>
                        <div className="user-security-equipment-epi-container">
                          <div className="user-security-equipment-text-container">
                            <p>Informe o numero do CA:</p>
                          </div>
                          <div className="user-security-equipment-select-epi-container">
                            <Input placeholder="0000" />
                          </div>
                        </div>
                        <div className="user-security-equipment-epi-container">
                          <div className="user-security-equipment-text-container"></div>
                          <div className="user-security-equipment-select-epi-container">
                            {epi.id ===
                            atividade.epis[atividade.epis.length - 1].id ? (
                              <button
                                className={`button-add-epi ${
                                  isEpiAdded ? "button-add-epi-expanded" : ""
                                }`}
                                onClick={() => handleAddEpi(atividade.id)}
                              >
                                <p>Adicionar EPI</p>
                              </button>
                            ) : (
                              <button
                                className={`button-add-epi ${
                                  isEpiAdded ? "button-add-epi-expanded" : ""
                                }`}
                                onClick={() =>
                                  handleDeleteEpi(atividade.id, epi.id)
                                }
                              >
                                <p>Excluir EPI</p>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <>
                    {atividade.id === atividades[atividades.length - 1].id ? (
                      <div
                        className="button-add-user-activity-container"
                        onClick={handleAddAtividade}
                      >
                        <p>Adicionar outra atividade</p>
                      </div>
                    ) : (
                      <div
                        className="button-add-user-activity-container"
                        onClick={() => handleDeleteAtividade(atividade.id)}
                      >
                        <p>Excluir atividade</p>
                      </div>
                    )}
                  </>
                </>
              )}
            </div>
          </div>
        ))}
        {!isCheckboxChecked && (
          <div className="user-health-container">
            <div className="user-health-text-container">
              <p>Adicione Atestado de Saúde (opcional):</p>
            </div>
            <div className="user-health-file-container">
              <div className="user-file-selected-container">
                <span>{fileName}</span>
                <PaperClipOutlined style={{ color: "#959595" }} />
              </div>
            </div>
            <div className="button-send-file-container">
              <label htmlFor="fileInput" className="label-input-file">
                <span>Selecionar arquivo</span>
              </label>
              <input
                type="file"
                id="fileInput"
                className="input-file"
                accept=".png, .jpeg, .jpg, .pdf"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files) {
                    setFileName(e.target.files[0].name);
                    setHealthCertificate(e.target.files[0].name);
                  }
                }}
              />
            </div>
          </div>
        )}
        <div className="button-save-infos-container">
          <button type="submit">Salvar</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
