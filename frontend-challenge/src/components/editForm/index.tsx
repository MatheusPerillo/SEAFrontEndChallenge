import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useDispatch } from "react-redux";

import { Checkbox, Input, Radio, Select, Switch } from "antd";
import { IoIosArrowRoundBack } from "react-icons/io";
import type { RadioChangeEvent } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import type { CheckboxProps } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IReduxUser, userSlice } from "../../reducers/index";

import "./styles.css";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface IEditForm {
  _id?: string;
  setViewState: React.Dispatch<
    React.SetStateAction<"AddViewUser" | "AddForm" | "EditForm">
  >;
}

interface Epi {
  id: string;
  name: string;
  ca: string;
}

interface Atividade {
  id: string;
  name: string;
  epis: Epi[];
}

const EditForm = ({ _id, setViewState }: IEditForm) => {
  const [activities, setActivities] = useState<Atividade[]>([
    { id: uuidv4(), name: "", epis: [{ id: uuidv4(), name: "", ca: "" }] },
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

  const { updateUser } = userSlice.actions;
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedData: IReduxUser = {
      _id,
      name,
      cpf,
      rg,
      dateOfBirth,
      gender: gender === 1 ? "Feminino" : "Masculino",
      status: status ? "Ativo" : "Inativo",
      role,
      usesEPI,
      healthCertificate,
      activities,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/users/user-update/${_id}`,
        updatedData
      );
      console.log(response.data);
      toast.success("Usuario atualizado com sucesso!", {
        onClose: () => window.location.reload(),
      });
      dispatch(updateUser(updatedData));
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar usuário");
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(event.target.value);
  };

  const handleRgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRg(event.target.value);
  };

  const handleDateOfBirthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateOfBirth(event.target.value);
  };

  const handleGenderChange = (e: RadioChangeEvent) => {
    setGender(Number(e.target.value));
  };

  const handleStatusChange = (checked: boolean) => {
    setStatus(checked);
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
  };

  const onCheckedboxChange: CheckboxProps["onChange"] = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };
  const handleUsesEPIChange = (e: CheckboxChangeEvent) => {
    setUsesEPI(e.target.checked);
    onCheckedboxChange(e);
  };

  const handleHealthCertificateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setFileName(e.target.files[0].name);
      setHealthCertificate(e.target.files[0].name);
    }
  };

  const handleChangeActivities = (atividadeId: string, value: string) => {
    setActivities(
      activities.map((atividade) =>
        atividade.id === atividadeId ? { ...atividade, name: value } : atividade
      )
    );
  };

  const handleChangeEPI = (
    atividadeId: string,
    epiId: string,
    value: string
  ) => {
    setActivities(
      activities.map((atividade) =>
        atividade.id === atividadeId
          ? {
              ...atividade,
              epis: atividade.epis.map((epi) =>
                epi.id === epiId ? { ...epi, name: value } : epi
              ),
            }
          : atividade
      )
    );
  };

  const handleAddEpi = (atividadeId: string) => {
    setActivities(
      activities.map((atividade) =>
        atividade.id === atividadeId
          ? {
              ...atividade,
              epis: [...atividade.epis, { id: uuidv4(), name: "", ca: "" }],
            }
          : atividade
      )
    );
    setIsEpiAdded(true);
  };

  const handleUpdateCa = (atividadeId: string, epiId: string, ca: string) => {
    setActivities(
      activities.map((atividade) =>
        atividade.id === atividadeId
          ? {
              ...atividade,
              epis: atividade.epis.map((epi) =>
                epi.id === epiId ? { ...epi, ca: ca } : epi
              ),
            }
          : atividade
      )
    );
  };

  const handleDeleteEpi = (atividadeId: string, epiId: string) => {
    setActivities(
      activities.map((atividade) =>
        atividade.id === atividadeId
          ? {
              ...atividade,
              epis: atividade.epis.filter((epi) => epi.id !== epiId),
            }
          : atividade
      )
    );

    if (
      activities.find((atividade) => atividade.id === atividadeId)?.epis
        .length === 2
    ) {
      setIsEpiAdded(false);
    }
  };

  const handleAddAtividade = () => {
    setActivities([
      ...activities,
      { id: uuidv4(), name: "", epis: [{ id: uuidv4(), name: "", ca: "" }] },
    ]);
  };

  const handleDeleteAtividade = (atividadeId: string) => {
    setActivities(
      activities.filter((atividade) => atividade.id !== atividadeId)
    );
  };

  return (
    <form className="form-global-container" onSubmit={handleSubmit}>
      <div
        className="form-header-container"
        onClick={() => setViewState("AddViewUser")}
      >
        <p className="form-header-text">
          <IoIosArrowRoundBack size="1.3em" color="white" /> Editar Funcionário
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
              checked={status}
              onChange={handleStatusChange}
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
                onChange={handleNameChange}
              />
            </div>
            <div className="user-name-form-container">
              <p>CPF</p>
            </div>
            <div className="user-input-form">
              <Input
                placeholder="000.000.000-00"
                value={cpf}
                onChange={handleCpfChange}
              />
            </div>
            <div className="user-name-form-container">
              <p>RG</p>
            </div>
            <div className="user-input-form">
              <Input
                placeholder="0.000.000"
                value={rg}
                onChange={handleRgChange}
              />
            </div>
          </div>
          <div className="user-infos-second-container">
            <div className="user-name-form-container">
              <p>Sexo</p>
            </div>
            <div className="user-input-form">
              <Radio.Group onChange={handleGenderChange} value={gender}>
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
                onChange={handleDateOfBirthChange}
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
                onChange={handleRoleChange}
                options={[
                  { value: "Cargo 1", label: "Cargo 1" },
                  { value: "Cargo 2", label: "Cargo 2" },
                  { value: "Cargo 3", label: "Cargo 3" },
                ]}
              />
            </div>
          </div>
        </div>
        {activities.map((atividade) => (
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
                <Checkbox checked={usesEPI} onChange={handleUsesEPIChange}>
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
                        value={atividade.name}
                        onChange={(value) =>
                          handleChangeActivities(atividade.id, value)
                        }
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
                              value={epi.name}
                              onChange={(value) =>
                                handleChangeEPI(atividade.id, epi.id, value)
                              }
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
                            <Input
                              placeholder="0000"
                              value={epi.ca}
                              onChange={(event) =>
                                handleUpdateCa(
                                  atividade.id,
                                  epi.id,
                                  event.target.value
                                )
                              }
                            />
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
                    {atividade.id === activities[activities.length - 1].id ? (
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
                onChange={handleHealthCertificateChange}
              />
            </div>
          </div>
        )}

        <button className="button-save-infos-container" type="submit">
          <p>Salvar</p>
        </button>
      </div>
    </form>
  );
};

export default EditForm;
