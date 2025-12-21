"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { SendIcon, type SendIconHandle } from "@/components/SendIcon";
import { CheckCircle2, XCircle } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const sendIconRef = useRef<SendIconHandle>(null);
  const statusMessageRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  useEffect(() => {
    if (submitStatus !== "idle") {
      document.getElementById("contact-status-anchor")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [submitStatus]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        if (onSuccess) {
          onSuccess();
        }
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">{t("name")}</Label>
        <Input
          id="name"
          type="text"
          placeholder={t("namePlaceholder")}
          autoComplete="name"
          {...register("name")}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email and Phone Fields - Same row on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            inputMode="email"
            placeholder={t("emailPlaceholder")}
            autoComplete="email"
            {...register("email", {
              onBlur: () => trigger("email"),
            })}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            {t("phone")}{" "}
            <span className="text-muted-foreground text-xs">
              ({t("optional")})
            </span>
          </Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder={t("phonePlaceholder")}
            autoComplete="tel"
            {...register("phone")}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <Label htmlFor="message">
          {t("message")}{" "}
          <span className="text-muted-foreground text-xs">
            ({t("optional")})
          </span>
        </Label>
        <Textarea
          id="message"
          placeholder={t("messagePlaceholder")}
          {...register("message")}
          className={`min-h-[120px] resize-none ${
            errors.message ? "border-destructive" : ""
          }`}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        loading={isSubmitting}
        onMouseEnter={() => sendIconRef.current?.startAnimation()}
        onMouseLeave={() => sendIconRef.current?.stopAnimation()}
      >
        <span className="flex items-center gap-2">
          {isSubmitting ? t("sending") : t("send")}
          {!isSubmitting && (
            <SendIcon ref={sendIconRef} size={20} isAnimated={false} />
          )}
        </span>
      </Button>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div
          ref={statusMessageRef}
          className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 text-sm text-green-800 dark:text-green-200 flex items-center gap-2"
        >
          <CheckCircle2 className="h-5 w-5 text-green-800 dark:text-green-200 flex-shrink-0" />
          <span>{t("success")}</span>
        </div>
      )}
      {submitStatus === "error" && (
        <div
          ref={statusMessageRef}
          className="rounded-lg bg-red-50 dark:bg-red-400/8 p-4 text-sm text-red-800 dark:text-destructive flex items-center gap-2"
        >
          <XCircle className="h-5 w-5 text-red-800 dark:text-destructive flex-shrink-0" />
          <span>{t("error")}</span>
        </div>
      )}
      <span id="contact-status-anchor" className="block scroll-mt-6" />
    </form>
  );
}
