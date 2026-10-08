import React, { useState } from "react";
import { createRoot } from "react-dom/client";

    function App() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(12);
    const [copied, setCopied] = useState(false);

    const generatePassword = () => {
        const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";


        
        let newPassword = "";

        for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        newPassword += characters[randomIndex];
        }

        setPassword(newPassword);
        setCopied(false);
    };

    const copyPassword = async () => {
        if (!password) return;

        await navigator.clipboard.writeText(password);
        setCopied(true);

        setTimeout(() => {
        setCopied(false);
        }, 1500);
    };

    const getStrength = () => {
        if (password.length < 10) return "Weak";
        if (password.length < 14) return "Medium";
        return "Strong";
    };

    const strength = getStrength();

    return (
        <div style={styles.container}>
        <h1>Password Generator</h1>

        <div style={styles.passwordBox}>
            <input
            type="text"
            value={password}
            readOnly
            placeholder="Your password"
            style={styles.input}
            />

            <button onClick={copyPassword} style={styles.copyButton}>
            {copied ? "Copied!" : "Copy"}
            </button>
        </div>

        <div style={styles.controls}>
            <label>
            Password Length: <strong>{length}</strong>
            </label>

            <input
            type="range"
            min="6"
            max="30"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            />
        </div>

        <button onClick={generatePassword} style={styles.generateButton}>
            Generate Password
        </button>

        {password && (
            <div style={styles.strength}>
            <p>
                Strength:{" "}
                <strong
                style={{
                    color:
                    strength === "Weak"
                        ? "red"
                        : strength === "Medium"
                        ? "orange"
                        : "green",
                }}
                >
                {strength}
                </strong>
            </p>

            <div style={styles.meterBackground}>
                <div
                style={{
                    ...styles.meter,
                    width:
                    strength === "Weak"
                        ? "33%"
                        : strength === "Medium"
                        ? "66%"
                        : "100%",
                    background:
                    strength === "Weak"
                        ? "red"
                        : strength === "Medium"
                        ? "orange"
                        : "green",
                }}
                />
            </div>
            </div>
        )}
        </div>
    );
    }

    const styles = {
    container: {
        width: "450px",
        margin: "80px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        fontFamily: "Arial",
        textAlign: "center",
    },

    passwordBox: {
        display: "flex",
        gap: "10px",
        marginBottom: "25px",
    },

    input: {
        flex: 1,
        padding: "12px",
        fontSize: "16px",
    },

    copyButton: {
        padding: "12px 15px",
        cursor: "pointer",
    },

    controls: {
        marginBottom: "20px",
    },

    generateButton: {
        padding: "12px 25px",
        background: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },

    strength: {
        marginTop: "25px",
    },

    meterBackground: {
        height: "10px",
        background: "#ddd",
        borderRadius: "5px",
        overflow: "hidden",
    },

    meter: {
        height: "100%",
        transition: "width 0.3s",
    },
    };

createRoot(document.getElementById("root")).render(<App />);