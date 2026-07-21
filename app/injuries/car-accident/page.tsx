import CarAccidentClient from "./CarAccidentClient";
import { carAccidentFaqs } from "./faqs";
import { getVisibleProviders } from "@/lib/providers/providerVisibility";

export const revalidate = 86400;

export default function CarAccidentPage() {
    return <CarAccidentClient faqs={carAccidentFaqs} doctors={getVisibleProviders()} />;
}