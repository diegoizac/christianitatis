import { Helmet } from "react-helmet-async";

interface EventSchemaProps {
  name: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
  };
  description: string;
  image?: string;
  performer?: string;
  offers?: {
    price: number;
    priceCurrency: string;
    url: string;
    availability: "InStock" | "SoldOut" | "PreOrder";
  };
}

export function EventSchema({
  name,
  startDate,
  endDate,
  location,
  description,
  image,
  performer,
  offers,
}: EventSchemaProps) {
  const siteUrl =
    import.meta.env.VITE_SITE_URL || "https://christianitatis.com.br";
  const eventImage = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    startDate,
    endDate: endDate || startDate,
    location: {
      "@type": "Place",
      name: location.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.address,
      },
    },
    description,
    ...(eventImage && { image: eventImage }),
    ...(performer && {
      performer: {
        "@type": "Person",
        name: performer,
      },
    }),
    ...(offers && {
      offers: {
        "@type": "Offer",
        price: offers.price,
        priceCurrency: offers.priceCurrency,
        url: offers.url,
        availability: `https://schema.org/${offers.availability}`,
      },
    }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
