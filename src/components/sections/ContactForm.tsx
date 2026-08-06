import { useState } from "react";
import { Send } from "lucide-react";
import { z } from "zod";
import { EMAIL_ADDRESS, WHATSAPP_NUMBER } from "@/lib/content";

const schema = z.object({
  name: z.string().trim().min(2, "Informe o seu nome").max(100, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(8, "Telefone inválido").max(30, "Telefone muito longo"),
  message: z.string().trim().min(10, "Conte um pouco mais sobre o projeto").max(1000),
});

type Values = z.infer<typeof schema>;

const EMPTY: Values = { name: "", email: "", phone: "", message: "" };

const FIELD =
  "w-full rounded-2xl border border-cream/15 bg-cream/[0.06] px-5 py-4 text-sm text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-gold/60";

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof Values) => (event: { target: { value: string } }) =>
    setValues((prev) => ({ ...prev, [key]: event.target.value }));

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof Values, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Values;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    const data = parsed.data;
    const subject = `Novo contato pelo site — ${data.name}`;
    const body = [
      `Nome: ${data.name}`,
      `E-mail: ${data.email}`,
      `Telefone: ${data.phone}`,
      "",
      data.message,
    ].join("\n");
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const whatsappFallback = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Sou ${values.name || "..."} e vim pelo site. ${values.message}`.trim(),
  )}`;

  return (
    <form onSubmit={onSubmit} className="mt-12 text-left" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-xs tracking-[0.2em] text-cream/50 uppercase">
            Nome
          </label>
          <input
            id="name"
            name="name"
            className={`mt-2 ${FIELD}`}
            value={values.name}
            onChange={set("name")}
            placeholder="Seu nome completo"
            maxLength={100}
          />
          {errors.name && <p className="mt-2 text-xs text-gold-soft">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-xs tracking-[0.2em] text-cream/50 uppercase">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`mt-2 ${FIELD}`}
            value={values.email}
            onChange={set("email")}
            placeholder="voce@email.com"
            maxLength={255}
          />
          {errors.email && <p className="mt-2 text-xs text-gold-soft">{errors.email}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="phone" className="text-xs tracking-[0.2em] text-cream/50 uppercase">
            Telefone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={`mt-2 ${FIELD}`}
            value={values.phone}
            onChange={set("phone")}
            placeholder="(85) 99999-9999"
            maxLength={30}
          />
          {errors.phone && <p className="mt-2 text-xs text-gold-soft">{errors.phone}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-xs tracking-[0.2em] text-cream/50 uppercase">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={`mt-2 ${FIELD} resize-none`}
            value={values.message}
            onChange={set("message")}
            placeholder="Conte sobre o seu projeto, data e objetivo."
            maxLength={1000}
          />
          {errors.message && <p className="mt-2 text-xs text-gold-soft">{errors.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="press-deep shadow-gold mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-10 py-5 text-xs font-semibold tracking-[0.22em] text-ink uppercase sm:w-auto"
      >
        Enviar mensagem
        <Send className="size-4" />
      </button>

      {sent && (
        <p className="mt-5 text-sm text-cream/70">
          Abrimos o seu app de e-mail com a mensagem pronta para envio. Preferindo, envie também
          pelo{" "}
          <a
            href={whatsappFallback}
            target="_blank"
            rel="noreferrer noopener"
            className="text-gold underline"
          >
            WhatsApp
          </a>
          .
        </p>
      )}

      <p className="mt-4 text-xs leading-relaxed text-cream/40">
        Ao enviar, você concorda com o uso dos seus dados para responder ao contato, conforme a
        Política de Privacidade.
      </p>
    </form>
  );
}
