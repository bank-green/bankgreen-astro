/**
 * LeadGen - Lead generation form slice.
 *
 * Variations: default
 *
 * Note: This is a complex interactive component that will need full
 * implementation with form handling, validation, and submission.
 * This is a semantic placeholder showing the structure.
 */
import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";

interface Props {
  slice: Content.LeadGenSlice;
}

export function LeadGen({ slice }: Props) {
  const primary = slice.primary as {
    title?: Content.TextSliceSlice["primary"]["text"];
    show_bank_field?: boolean;
    show_status_field?: boolean;
    form_bank_label?: string;
    form_name_label?: string;
    form_email_label?: string;
    form_status_label?: string;
    button_label?: string;
  };

  const items = slice.items as Array<{
    bullet_text?: Content.TextSliceSlice["primary"]["text"];
    dropdown_status_option?: string;
  }>;

  const title = primary.title ? asText(primary.title) : "Curious about switching to a green bank?";
  const showBankField = primary.show_bank_field ?? true;
  const showStatusField = primary.show_status_field ?? true;

  // Extract bullet points for the value proposition list
  const bulletPoints = items.map((item) => (item.bullet_text ? asText(item.bullet_text) : "")).filter((text) => text.length > 0);

  // Extract status options for the dropdown
  const statusOptions = items
    .map((item) => item.dropdown_status_option)
    .filter((opt): opt is string => typeof opt === "string" && opt !== "Select none (default)");

  return (
    <section data-slice-type={slice.slice_type} aria-labelledby="lead-gen-title">
      <h2 id="lead-gen-title">{title}</h2>

      {bulletPoints.length > 0 && (
        <ul>
          {bulletPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}

      <form>
        {showBankField && (
          <div>
            <label htmlFor="bank">{primary.form_bank_label || "I am interested in"}</label>
            {/* Bank search component would go here */}
            <input type="text" id="bank" name="bank" placeholder="Search for a bank..." />
          </div>
        )}

        <div>
          <label htmlFor="firstName">{primary.form_name_label || "First name"}</label>
          <input type="text" id="firstName" name="firstName" placeholder="First name, so we can say hi" />
        </div>

        <div>
          <label htmlFor="email">{primary.form_email_label || "Email address"}</label>
          <input type="email" id="email" name="email" placeholder="Your email address" required />
        </div>

        {showStatusField && statusOptions.length > 0 && (
          <div>
            <label htmlFor="status">{primary.form_status_label || "Which option best describes your current status?"}</label>
            <select id="status" name="status">
              <option value="">Select an option...</option>
              {statusOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label>
            <input type="checkbox" name="isAgreeMarketing" />
            I wish to receive more information via email from Bank.Green.
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" name="isAgreeTerms" required />I have read and understood Bank.Green's{" "}
            <a href="/privacy">privacy policy</a>.
          </label>
        </div>

        <button type="submit">{primary.button_label || "Complete Sign Up"}</button>
      </form>
    </section>
  );
}
