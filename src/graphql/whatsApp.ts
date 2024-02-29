import { gql } from '@apollo/client';

export const GET_SESSIONS_WHATSAPP = gql`
  query GetSessionsWhatsApp {
    getSessionsWhatsApp {
      status
      data
    }
  }
`;

export const DELETE_SESSIONS_WHATSAPP = gql`
  mutation DeleteSessionWhatsApp($input: DeleteSessionWhatsAppInput) {
    deleteSessionWhatsApp(input: $input) {
      status
    }
  }
`;

export const CREATE_SESSIONS_WHATSAPP = gql`
  mutation CreateSessionWhatsApp($input: CreateSessionWhatsAppInput) {
    createSessionWhatsApp(input: $input) {
      status
      qr
    }
  }
`;

export const SEND_MESSAGE_WHATSAPP = gql`
  mutation SendMessageWhatsApp($input: SendMessageWhatsAppInput) {
    sendMessageWhatsApp(input: $input) {
      status
    }
  }
`;
