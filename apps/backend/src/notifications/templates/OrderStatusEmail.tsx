import * as React from 'react';
import { Html, Head, Body, Container, Text, Heading } from '@react-email/components';

interface OrderStatusEmailProps {
  customerName: string;
  orderId: string;
  newStatus: string;
}

export const OrderStatusEmail: React.FC<OrderStatusEmailProps> = ({
  customerName = 'Customer',
  orderId = 'ORD-12345',
  newStatus = 'SHIPPED'
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Update on your order</Heading>
        <Text style={text}>Hi {customerName},</Text>
        <Text style={text}>
          The status of your order <strong>{orderId}</strong> has been updated to:
        </Text>
        
        <Text style={statusBadge}>
          {newStatus.replace('_', ' ')}
        </Text>
        
        <Text style={text}>
          Thanks for shopping with us!
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = { backgroundColor: '#ffffff', fontFamily: 'sans-serif' };
const container = { margin: '0 auto', padding: '20px 0 48px', width: '580px' };
const h1 = { color: '#333', fontSize: '24px', fontWeight: '600' };
const text = { color: '#333', fontSize: '16px', lineHeight: '1.6' };
const statusBadge = { 
  display: 'inline-block',
  backgroundColor: '#000',
  color: '#fff',
  padding: '8px 16px',
  borderRadius: '4px',
  fontWeight: 'bold',
  marginTop: '10px',
  marginBottom: '20px'
};

export default OrderStatusEmail;
