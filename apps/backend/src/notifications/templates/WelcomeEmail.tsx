import * as React from 'react';
import { Html, Head, Body, Container, Text, Heading, Button, Section } from '@react-email/components';

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmailTemplate: React.FC<WelcomeEmailProps> = ({ name = 'Creator' }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to MerchHub, {name}!</Heading>
        <Text style={text}>
          We're thrilled to have you here. You can now start browsing creator stores or set up your own storefront.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://merchhub.app/dashboard">
            Go to Dashboard
          </Button>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.4',
  margin: '16px 0',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '1.6',
};

const btnContainer = {
  textAlign: 'center' as const,
  marginTop: '24px',
};

const button = {
  backgroundColor: '#000000',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 24px',
};

export default WelcomeEmailTemplate;
