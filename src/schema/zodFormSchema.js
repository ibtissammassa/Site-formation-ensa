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

export const FromModuleSchema = z.object({
  name: z.string(),
  date_debut: z.string().datetime(),
  date_fin: z.string().datetime(),
  objectif: z.string(),
  volumeTotal: z.number(),
  volumeTd: z.number(),
  volumeTp: z.number(),
  prof: z.string(),
  semester: z.number(),
});
