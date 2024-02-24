import { Input, Radio, Select, Switch } from "antd";
import "./styles.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";

interface IForm {
  setIsEditing: (value: boolean) => void;
}

const Form = ({ setIsEditing }: IForm) => {
  const handleBackClick = () => {
    setIsEditing(false);
  };

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="form-global-container">
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
            <Switch checkedChildren="Ativo" unCheckedChildren="Inativo" />
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
              <Input placeholder="Nome" />
            </div>
            <div className="user-name-form-container">
              <p>CPF</p>
            </div>
            <div className="user-input-form">
              <Input placeholder="CPF" />
            </div>
            <div className="user-name-form-container">
              <p>RG</p>
            </div>
            <div className="user-input-form">
              <Input placeholder="RF" />
            </div>
          </div>
          <div className="user-infos-second-container">
            <div className="user-name-form-container">
              <p>Sexo</p>
            </div>
            <div className="user-input-form">
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>Feminino</Radio>
                <Radio value={2}>Masculino</Radio>
              </Radio.Group>
            </div>
            <div className="user-name-form-container">
              <p>Data de Nascimento</p>
            </div>
            <div className="user-input-form">
              <Input placeholder="00/00/0000" />
            </div>
            <div className="user-name-form-container">
              <p>Cargo</p>
            </div>
            <div className="user-input-form">
              <Select
                defaultValue="Escolha um cargo"
                style={{ width: "100%" }}
                onChange={handleChange}
                options={[
                  { value: "Cargo 1", label: "Cargo 1" },
                  { value: "Cargo 2", label: "Cargo 2" },
                  { value: "Cargo 3", label: "Cargo 3" },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="user-security-equipment-container"></div>
        <div className="user-health-container"></div>
        <div className="button-save-infos-container"></div>
      </div>
    </div>
  );
};

export default Form;
