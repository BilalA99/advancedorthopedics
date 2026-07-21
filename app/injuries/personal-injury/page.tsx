import PersonalInjuryClient from "./PersonalInjuryClient"
import { personalInjuryFaqs } from "./faqs"
import { getVisibleProviders, getVisibleReviews } from "@/lib/providers/providerVisibility";
import { sitewideReviews } from "@/components/data/socialProofReviews";

export const revalidate = 86400

export default function PersonalInjuryPage() {
  return <PersonalInjuryClient faqs={personalInjuryFaqs} doctors={getVisibleProviders()} reviews={getVisibleReviews(sitewideReviews)} />
}

