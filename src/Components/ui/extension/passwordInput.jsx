"use client";
import { Button } from "../button";
import { Input } from "../input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
function PasswordInput(field) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        placeholder="mot de passe"
        {...field}
        type={showPassword ? "text" : "password"}
      />
      {showPassword ? (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0"
          type="button"
          onClick={() => {
            setShowPassword(false);
          }}
        >
          <EyeOffIcon className="text-gray-400" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0"
          type="button"
          onClick={() => {
            setShowPassword(true);
          }}
        >
          <EyeIcon className="text-gray-400" />
        </Button>
      )}
    </div>
  );
}

export default PasswordInput;
