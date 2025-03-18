import {
  Column,
  Flex,
  Heading,
  Text,
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import styles from "@/components/about/about.module.scss";
import { person, team, about, social } from "@/app/resources/content";
import TeamCard from "./TeamCard";

export async function generateMetadata() {
  const title = about.title;
  const description = about.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/about`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function About() {
  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Cerberus Security Team",
            description: about.description,
            url: `https://${baseURL}/about`,
            members: team.map(member => ({
              "@type": "Person",
              name: member.name,
              jobTitle: member.role,
            })),
            sameAs: social
              .filter((item) => item.link && !item.link.startsWith("mailto:"))
              .map((item) => item.link),
          }),
        }}
      />
      
      <Flex horizontal="center" marginBottom="xl" fillWidth>
        <Heading variant="display-strong-l">
          {about.title}
        </Heading>
      </Flex>
      
      {about.intro.display && (
        <Flex horizontal="center" marginBottom="xl" fillWidth>
          <Text variant="body-default-l" style={{ textAlign: 'center', maxWidth: 'var(--responsive-width-l)' }}>
            {about.intro.description}
          </Text>
        </Flex>
      )}
      
      <Flex fillWidth horizontal="center" paddingY="xl">
        <Flex 
          gap="xl" 
          horizontal="center" 
          mobileDirection="column" 
          direction="row"
          style={{ maxWidth: '900px', width: '100%' }}
        >
          {team.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </Flex>
      </Flex>
    </Column>
  );
}
