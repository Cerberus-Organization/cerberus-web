"use client";

import { Avatar, Column, Flex, Heading, Text } from "@/once-ui/components";

// Estilo CSS para o card
const teamCardStyle = {
  backdropFilter: 'blur(var(--static-space-1))',
  WebkitBackdropFilter: 'blur(var(--static-space-1))',
  flex: 1,
  minWidth: '280px',
  minHeight: '320px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'rgba(255, 255, 255, 0.1)',
};

// CSS com !important para garantir que as regras sejam aplicadas
const teamCardCSS = `
  .team-card:hover {
    transform: scale(1.05);
    border-color: #8B5CF6 !important; /* Cor violet-500 */
    box-shadow: 0 0 15px rgba(139, 92, 246, 0.3) !important;
  }
`;

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <>
      <style jsx global>{teamCardCSS}</style>
      <Flex
        className="team-card"
        background="surface"
        radius="m-4"
        shadow="l"
        padding="xl"
        style={teamCardStyle}
      >
        <Column
          gap="m"
          horizontal="center"
          style={{ textAlign: 'center', flex: 1, display: 'flex', justifyContent: 'center' }}
        >
          <Flex horizontal="center" fillWidth marginBottom="m">
            <Avatar src={member.avatar} size="xl" />
          </Flex>
          <Heading 
            variant="display-strong-s"
            style={{ 
              textAlign: 'center',
              color: '#8B5CF6' // Cor violet-500
            }}
          >
            {member.name}
          </Heading>
          <Text
            variant="body-default-m"
            onBackground="neutral-weak"
            style={{ 
              textAlign: 'center',
              whiteSpace: 'pre-line',
              marginTop: 'var(--space-s)'
            }}
          >
            {member.role}
          </Text>
        </Column>
      </Flex>
    </>
  );
} 