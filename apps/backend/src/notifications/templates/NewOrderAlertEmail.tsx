import * as React from 'react';
import { Html, Head, Body, Container, Text, Heading, Section, Button } from '@react-email/components';

interface NewOrderAlertEmailProps {
  orderId: string;
  total: number;
}

export const NewOrderAlertEmail: React.FC<NewOrderAlertEmailProps> = ({
  orderId = 'ORD-12345',
  total = 0,
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Cha-Ching! New Order! 🎉</Heading>
        <Text style={text}>
          Great news! You just received a new order for ${(total / 100).toFixed(2)}.
        </Text>
        
        <Section style={orderBox}>
          <Text style={orderIdText}>Order ID: {orderId}</Text>
        </Section>
        
        <Section style={btnContainer}>
          <Button style={button} href={`https://merchhub.app/dashboard/orders/${orderId}`}>
            View Order Details
          </Button>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = { backgroundColor: '#ffffff', fontFamily: 'sans-serif' };
const container = { margin: '0 auto', padding: '20px 0 48px', width: '580px' };
const h1 = { color: '#333', fontSize: '24px', fontWeight: '600' };
const text = { color: '#333', fontSize: '16px', lineHeight: '1.6' };
const orderBox = { backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginTop: '20px', textAlign: 'center' as const };
const orderIdText = { fontWeight: 'bold', fontSize: '16px', margin: '0' };
const btnContainer = { textAlign: 'center' as const, marginTop: '24px' };
const button = { backgroundColor: '#000000', borderRadius: '4px', color: '#fff', fontSize: '16px', padding: '12px 24px', textDecoration: 'none' };

export default NewOrderAlertEmail;
