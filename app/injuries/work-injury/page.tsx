import WorkInjuryClient from "./WorkInjuryClient"
import { workInjuryFaqs } from "./faqs"
import { getVisibleProviders, getVisibleReviews } from "@/lib/providers/providerVisibility";
import { sitewideReviews } from "@/components/data/socialProofReviews";

export const revalidate = 86400

export default function WorkInjuryPage() {
  return <WorkInjuryClient faqs={workInjuryFaqs} doctors={getVisibleProviders()} reviews={getVisibleReviews(sitewideReviews)} />
}
