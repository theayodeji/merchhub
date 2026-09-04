import * as React from 'react';
import { Html, Head, Body, Container, Text, Heading, Section, Hr } from '@react-email/components';

interface OrderConfirmationEmailProps {
  customerName: string;
  orderId: string;
  total: number;
  items: Array<{ productName: string; quantity: number; unitPrice: number }>;
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
  customerName = 'Customer',
  orderId = 'ORD-12345',
  total = 0,
  items = []
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Order Confirmed!</Heading>
        <Text style={text}>Hi {customerName},</Text>
        <Text style={text}>
          Thanks for shopping on MerchHub. We've received your order and are getting it ready.
        </Text>
        
        <Section style={orderBox}>
          <Text style={orderIdText}>Order ID: {orderId}</Text>
          <Hr style={hr} />
          {items.map((item, i) => (
            <Text key={i} style={itemText}>
              {item.quantity}x {item.productName || 'Product'} - ${(item.unitPrice / 100).toFixed(2)}
            </Text>
          ))}
          <Hr style={hr} />
          <Text style={totalText}>Total: ${(total / 100).toFixed(2)}</Text>
        </Section>
        
        <Text style={footer}>
          If you have any questions, reply to this email.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = { backgroundColor: '#ffffff', fontFamily: 'sans-serif' };
const container = { margin: '0 auto', padding: '20px 0 48px', width: '580px' };
const h1 = { color: '#333', fontSize: '24px', fontWeight: '600' };
const text = { color: '#333', fontSize: '16px', lineHeight: '1.6' };
const orderBox = { backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginTop: '20px' };
const orderIdText = { fontWeight: 'bold', fontSize: '14px', margin: '0 0 10px 0' };
const itemText = { fontSize: '14px', margin: '5px 0' };
const totalText = { fontWeight: 'bold', fontSize: '16px', margin: '10px 0 0 0', textAlign: 'right' as const };
const hr = { borderColor: '#e6ebf1', margin: '15px 0' };
const footer = { color: '#8898aa', fontSize: '12px', marginTop: '30px' };

export default OrderConfirmationEmail;
