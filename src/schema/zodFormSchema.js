import { z } from "zod";

export const fileSchema = z.instanceof(File).refine(
  (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    return file.size <= maxSize;
  },
  {
    message: "Each file must be less than 5MB",
  }
);
export const imageSchema = z.instanceof(File).refine(
  (file) => {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    // Check if the file is an image
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return false;
    }

    // Check if the file size is within the limit
    if (file.size > maxSize) {
      return false;
    }

    return true;
  },
  {
    message:
      "Invalid file. Please upload an image file (jpg, jpeg, png, gif) within 5MB.",
  }
);

export const addTARSchema = z.object({
  title: z.string().min(5, { message: "Title is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be less than 500 characters" }),
  limitDateAndTime: z.date(),
  resources: z
    .union([
      fileSchema,
      z
        .array(fileSchema)
        .max(5, { message: "Cannot upload more than 5 files" }),
    ])
    .optional(),
  module: z.string(),
});

export const FormInscriptionSchema = z.object({
  nom: z.string(),
  prenom: z.string(),
  numeroTele: z.string(),
  cin: z
    .string()
    .regex(new RegExp("^[a-zA-Z]{2}\\d{3,5}"), { message: "Invalid CIN" }),
  email: z.string().email(),
  confirmationEmail: z.string().email(),
  motDePass: z.string(),
  confirmationMotDePass: z.string(),
});
export const FormProfSchema = z.object({
  nom: z.string(),
  prenom: z.string(),
  numeroTele: z.string(),
  cin: z
    .string()
    .regex(new RegExp("^[a-zA-Z]{2}\\d{3,5}"), { message: "Invalid CIN" }),
  email: z.string().email(),
  motDePass: z.string(),
});
//   .superRefine(({ motDePass }, checkPassComplexity) => {
//     const containsUppercase = (ch) => /[A-Z]/.test(ch);
//     const containsLowercase = (ch) => /[a-z]/.test(ch);
//     const containsSpecialChar = (ch) =>
//       /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
//     let countOfUpperCase = 0,
//       countOfLowerCase = 0,
//       countOfNumbers = 0,
//       countOfSpecialChar = 0;
//     for (let i = 0; i < motDePass.length; i++) {
//       let ch = motDePass.charAt(i);
//       if (!isNaN(+ch)) countOfNumbers++;
//       else if (containsUppercase(ch)) countOfUpperCase++;
//       else if (containsLowercase(ch)) countOfLowerCase++;
//       else if (containsSpecialChar(ch)) countOfSpecialChar++;
//     }
//     if (countOfNumbers < 1) {
//       checkPassComplexity.addIssue({
//         code: "custom",
//         message: "password does not have a number",
//       });
//     } else if (countOfUpperCase < 1) {
//       checkPassComplexity.addIssue({
//         code: "custom",
//         message: "password does not have uppercase character",
//       });
//     } else if (countOfLowerCase < 1) {
//       checkPassComplexity.addIssue({
//         code: "custom",
//         message: "password does not have lowercase character",
//       });
//     } else if (countOfSpecialChar < 1) {
//       checkPassComplexity.addIssue({
//         code: "custom",
//         message: "password does not have special character",
//       });
//     }
//   });
//   .superRefine(({ email, confirmationEmail }, emailConfirmaionMatching) => {
//     if (!email.match(confirmationEmail)) {
//       emailConfirmaionMatching.addIssue({
//         code: "custom",
//         message: "email doesn't match",
//       });
//     }
//   })
//   .superRefine(
//     ({ motDePass, confirmationMotDePass }, modDePassConfirmaionMatching) => {
//       if (!motDePass.match(confirmationMotDePass)) {
//         modDePassConfirmaionMatching.addIssue({
//           code: "custom",
//           message: "passsword doesn't match",
//         });
//       }
//     }
//   );

export const FormConnectionSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const fileImageSchema = z
  .instanceof(File)
  .refine(
    (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
    {
      message: "File must be an image (jpeg, png, gif)",
    }
  )
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must be less than 5MB",
  });

export const FromModuleSchema = z.object({
  name: z.string(),
  date_debut: z.date(),
  date_fin: z.date(),
  objectif: z.string(),
  volumeCours: z.string().refine((value) => !isNaN(Number(value)), {
    message: "Volume of courses must be a number",
  }),
  volumeTd: z.string().refine((value) => !isNaN(Number(value)), {
    message: "Volume of tutorials must be a number",
  }),
  volumeTp: z.string().refine((value) => !isNaN(Number(value)), {
    message: "Volume of practicals must be a number",
  }),
  prof: z.any(),
  semester: z.string(),
  cover_image: fileImageSchema,
});
