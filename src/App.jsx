import React, { useState } from "react";
import Robotax from "./images/robotax.png";
import "./index.css";

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientTel, setRecipientTel] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Salva o arquivo no estado
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null); // Remove o arquivo
    setRecipientEmail(""); // Reseta o campo de e-mail
    setRecipientTel(""); // Reseta o campo de e-mail
  };

  const handleSendFile = () => {
    if (selectedFile && recipientEmail) {
      setLoading(true); // Exibe o loader enquanto processa
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("email", recipientEmail);
      formData.append("tel", recipientTel);

      fetch("http://localhost:3001/send-email", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("E-mail enviado com sucesso!");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      alert("Por favor, selecione um arquivo e informe o e-mail do destinatário.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      {/* Logo */}
      <div className="mb-6">
        <img src={Robotax} alt="Logo Robotax" className="w-32 h-auto" />
      </div>

      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-400">
          Enviar PDF por E-mail
        </h1>
        <p className="text-gray-400 text-lg">
          Faça o upload do PDF e envie-o para o e-mail desejado.
        </p>
      </header>

      {/* Formulário */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center w-full max-w-md">
        {selectedFile ? (
          <div className="flex flex-col items-center">
            <p className="text-white text-lg font-bold mb-4">
              Arquivo selecionado:{" "}
              <span className="text-purple-400">{selectedFile.name}</span>
            </p>
            {/* Campo de e-mail */}
            <input
              type="email"
              placeholder="Digite o e-mail do destinatário"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="mb-4 w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Digite o número do destinatário"
              value={recipientTel}
              onChange={(e) => setRecipientTel(e.target.value)}
              className="mb-4 w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
            {/* Botão para enviar o arquivo */}
            <button
              onClick={handleSendFile}
              className="mb-4 bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition"
              disabled={loading}
            >
              {loading ? "Enviando e-mail..." : "Enviar e-mail"}
            </button>
            {/* Botão para remover o arquivo */}
            <button
              onClick={handleRemoveFile}
              className="text-red-500 font-bold hover:text-red-700 transition"
            >
              ❌ Remover arquivo
            </button>
          </div>
        ) : (
          <>
            <label
              htmlFor="fileInput"
              className="flex items-center justify-center w-full h-16 bg-purple-600 text-white font-bold text-lg rounded-lg cursor-pointer hover:bg-purple-700 transition"
            >
              Selecionar arquivo PDF
            </label>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-10 text-purple-400 text-sm">©Robotax 2024</footer>
    </div>
  );
}

export default FileUploadPage;
