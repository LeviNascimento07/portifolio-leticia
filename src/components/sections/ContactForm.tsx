import { useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";
import { WHATSAPP_NUMBER } from "@/lib/content";

const schema = z.object({
  name: z.string().trim().min(2, "Informe o seu nome").max(100, "Nome muito longo"),
  email: z.string().trim().min(1, "Informe o seu e-mail").email("E-mail inválido").max(255),
  phone: z.string().trim().min(8, "Informe um telefone válido").max(30, "Telefone muito longo"),
  message: z.string().trim().min(10, "Conte um pouco mais sobre o projeto").max(1000),
});

type Values = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", email: "", phone: "", message: "" };

const FIELD =
  "w-full rounded-2xl border border-cream/15 bg-cream/[0.06] px-5 py-4 text-sm text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-gold/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2";
const FIELD_INVALID = "border-destructive/70 focus:border-destructive";

function validateField(key: keyof Values, values: Values): string | undefined {
  const fieldSchema = schema.shape[key];
  const result = fieldSchema.safeParse(values[key]);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const set = (key: keyof Values) => (event: { target: { value: string } }) => {
    const nextValues = { ...values, [key]: event.target.value };
    setValues(nextValues);
    if (touched[key]) {
      setErrors((prev) => ({ ...prev, [key]: validateField(key, nextValues) }));
    }
  };

  const onBlur = (key: keyof Values) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateField(key, values) }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Values;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setTouched({ name: true, email: true, phone: true, message: true });
      const firstInvalid = (Object.keys(next)[0] ?? null) as keyof Values | null;
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    setErrors({});
    setSubmitting(true);

    const data = parsed.data;
    const text = [
      `Olá! Sou ${data.name} e vim pelo site.`,
      `E-mail: ${data.email}`,
      `Telefone: ${data.phone}`,
      "",
      data.message,
    ].join("\n");
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    timeoutRef.current = setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setSubmitting(false);
      setSent(true);
    }, 700);
  };

  const fields: {
    key: keyof Values;
    label: string;
    type: string;
    placeholder: string;
    maxLength: number;
    span?: boolean;
  }[] = [
    { key: "name", label: "Nome", type: "text", placeholder: "Seu nome completo", maxLength: 100 },
    { key: "email", label: "E-mail", type: "email", placeholder: "voce@email.com", maxLength: 255 },
    {
      key: "phone",
      label: "Telefone",
      type: "tel",
      placeholder: "(85) 99999-9999",
      maxLength: 30,
      span: true,
    },
  ];

  return (
    <form onSubmit={onSubmit} className="mt-12 text-left" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const error = errors[field.key];
          const errorId = `${field.key}-error`;
          return (
            <div key={field.key} className={field.span ? "sm:col-span-2" : undefined}>
              <label
                htmlFor={field.key}
                className="text-xs tracking-[0.2em] text-cream/50 uppercase"
              >
                {field.label}
              </label>
              <input
                id={field.key}
                name={field.key}
                type={field.type}
                required
                aria-required="true"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className={`mt-2 ${FIELD} ${error ? FIELD_INVALID : ""}`}
                value={values[field.key]}
                onChange={set(field.key)}
                onBlur={onBlur(field.key)}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
              />
              {error && (
                <p id={errorId} role="alert" className="mt-2 text-xs text-gold-soft">
                  {error}
                </p>
              )}
            </div>
          );
        })}

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-xs tracking-[0.2em] text-cream/50 uppercase">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`mt-2 ${FIELD} resize-none ${errors.message ? FIELD_INVALID : ""}`}
            value={values.message}
            onChange={set("message")}
            onBlur={onBlur("message")}
            placeholder="Conte sobre o seu projeto, data e objetivo."
            maxLength={1000}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="mt-2 text-xs text-gold-soft">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="press-deep shadow-gold mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-10 py-5 text-xs font-semibold tracking-[0.22em] text-ink uppercase transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          <>
            Enviar mensagem
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </button>

      <p aria-live="polite" className="sr-only">
        {submitting ? "Enviando solicitação" : sent ? "Solicitação enviada" : ""}
      </p>

      {sent && (
        <p className="mt-5 text-sm text-cream/70">
          Solicitação enviada! Abrimos o WhatsApp com a sua mensagem pronta para envio.
        </p>
      )}

      <p className="mt-4 text-xs leading-relaxed text-cream/40">
        Ao enviar, você concorda com o uso dos seus dados para responder ao contato, conforme a
        Política de Privacidade.
      </p>
    </form>
  );
}
