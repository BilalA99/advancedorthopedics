import SlipAndFallClient from "./SlipAndFallClient";
import { slipFallFaqs } from "./faqs";
import { getVisibleProviders, getVisibleReviews } from "@/lib/providers/providerVisibility";
import { sitewideReviews } from "@/components/data/socialProofReviews";

export const revalidate = 86400;

export default function SlipAndFallPage() {
    return <SlipAndFallClient faqs={slipFallFaqs} doctors={getVisibleProviders()} reviews={getVisibleReviews(sitewideReviews)} />;
}