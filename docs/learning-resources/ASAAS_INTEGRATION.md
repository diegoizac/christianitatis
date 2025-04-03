# Integração Asaas - Christianitatis

## Recursos Oficiais

1. [Documentação Oficial Asaas](https://asaas.com/documentacao)
2. [API Reference](https://www.asaas.com/documentacao/api)
3. [SDK Node.js](https://github.com/asaas-com/asaas-node)

## Configuração Inicial

### 1. Setup do Cliente

```typescript
// src/lib/asaas.ts
import { Asaas } from "@asaas/sdk";

const asaas = new Asaas({
  apiKey: process.env.ASAAS_API_KEY,
  environment:
    process.env.NODE_ENV === "production" ? "producao" : "homologacao",
});

export default asaas;
```

### 2. Tipos TypeScript

```typescript
// src/types/asaas.ts
export interface AsaasCustomer {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  mobilePhone?: string;
  cpfCnpj: string;
  postalCode?: string;
  address?: string;
  addressNumber?: string;
  complement?: string;
  province?: string;
  externalReference?: string;
  notificationDisabled?: boolean;
  additionalEmails?: string;
  municipalInscription?: string;
  stateInscription?: string;
  observations?: string;
}

export interface AsaasPayment {
  customer: string;
  billingType: "BOLETO" | "CREDIT_CARD" | "PIX";
  value: number;
  dueDate: string;
  description?: string;
  externalReference?: string;
  installmentCount?: number;
  totalValue?: number;
  installmentValue?: number;
  discount?: {
    value: number;
    dueDateLimitDays: number;
    type: "FIXED" | "PERCENTAGE";
  };
  interest?: {
    value: number;
    type: "PERCENTAGE";
  };
  fine?: {
    value: number;
    type: "PERCENTAGE";
  };
}
```

## Implementação

### 1. Serviço de Clientes

```typescript
// src/services/asaas/customer.ts
import asaas from "@/lib/asaas";
import type { AsaasCustomer } from "@/types/asaas";

export const customerService = {
  async create(data: AsaasCustomer) {
    try {
      const customer = await asaas.customers.create(data);
      return customer;
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      throw error;
    }
  },

  async update(id: string, data: Partial<AsaasCustomer>) {
    try {
      const customer = await asaas.customers.update(id, data);
      return customer;
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      throw error;
    }
  },

  async get(id: string) {
    try {
      const customer = await asaas.customers.get(id);
      return customer;
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      throw error;
    }
  },
};
```

### 2. Serviço de Pagamentos

```typescript
// src/services/asaas/payment.ts
import asaas from "@/lib/asaas";
import type { AsaasPayment } from "@/types/asaas";

export const paymentService = {
  async create(data: AsaasPayment) {
    try {
      const payment = await asaas.payments.create(data);
      return payment;
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
      throw error;
    }
  },

  async getPaymentLink(id: string) {
    try {
      const link = await asaas.payments.getLink(id);
      return link;
    } catch (error) {
      console.error("Erro ao gerar link de pagamento:", error);
      throw error;
    }
  },

  async processWebhook(data: any) {
    try {
      // Implementar lógica de webhook
      switch (data.event) {
        case "PAYMENT_RECEIVED":
          await this.handlePaymentReceived(data);
          break;
        case "PAYMENT_CONFIRMED":
          await this.handlePaymentConfirmed(data);
          break;
        // Adicionar outros casos conforme necessário
      }
    } catch (error) {
      console.error("Erro ao processar webhook:", error);
      throw error;
    }
  },
};
```

### 3. Webhook Handler

```typescript
// src/pages/api/webhooks/asaas.ts
import { NextApiRequest, NextApiResponse } from "next";
import { paymentService } from "@/services/asaas/payment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Verificar assinatura do webhook
    const signature = req.headers["asaas-signature"];
    if (!signature) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Processar webhook
    await paymentService.processWebhook(req.body);

    return res.status(200).json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
```

## Exemplos de Uso

### 1. Criar Cliente e Pagamento

```typescript
// Exemplo de uso em um componente/página
import { customerService } from "@/services/asaas/customer";
import { paymentService } from "@/services/asaas/payment";

async function handleDonation(data: DonationFormData) {
  try {
    // Criar ou buscar cliente
    const customer = await customerService.create({
      name: data.name,
      email: data.email,
      cpfCnpj: data.cpf,
      phone: data.phone,
    });

    // Criar pagamento
    const payment = await paymentService.create({
      customer: customer.id,
      billingType: data.paymentMethod,
      value: data.amount,
      dueDate: new Date().toISOString().split("T")[0],
      description: "Doação - Christianitatis",
    });

    // Gerar link de pagamento
    const paymentLink = await paymentService.getPaymentLink(payment.id);

    // Redirecionar para pagamento
    window.location.href = paymentLink;
  } catch (error) {
    console.error("Erro ao processar doação:", error);
    throw error;
  }
}
```

## Melhores Práticas

1. **Segurança**

   - Nunca exponha a API Key no frontend
   - Valide assinaturas de webhooks
   - Use HTTPS para todas as requisições
   - Implemente rate limiting

2. **Tratamento de Erros**

   - Log detalhado de erros
   - Retentativas em falhas temporárias
   - Notificações para erros críticos
   - Fallbacks para indisponibilidade

3. **Performance**

   - Cache de dados do cliente
   - Processamento assíncrono de webhooks
   - Otimização de consultas

4. **Monitoramento**
   - Log de todas as transações
   - Métricas de sucesso/falha
   - Alertas para anomalias
   - Dashboard de acompanhamento

## Recursos Adicionais

- [Documentação de Webhooks](https://www.asaas.com/documentacao/webhooks)
- [Guia de Integração](https://www.asaas.com/documentacao/guia-de-integracao)
- [FAQ Técnico](https://www.asaas.com/documentacao/faq)

## Exercícios Práticos

1. Implemente criação de cliente
2. Configure recebimento de pagamento
3. Processe webhooks
4. Implemente relatórios financeiros
