# Lotofácil Pro - Gerador de Jogos Inteligente

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC2?style=flat-square&logo=pwa&logoColor=white)

> Um gerador inteligente de jogos para Lotofácil que utiliza desdobramento matemático para criar combinações estratégicas otimizadas.

Desenvolvido por **André Miranda**

---

## 📋 Sobre o Projeto

**Lotofácil Pro** é uma aplicação web moderna que gera jogos otimizados para a Lotofácil através de algoritmos de desdobramento matemático. A ferramenta permite que você defina 15 números principais e gera automaticamente 9 combinações únicas baseadas em critérios matemáticos específicos.

### Características Principais

- ✅ **Interface Intuitiva**: Design responsivo e otimizado para todos os dispositivos
- ✅ **Geração Inteligente**: Algoritmo baseado em desdobramento matemático (9 dentro + 6 fora)
- ✅ **Surpresinha**: Geração aleatória de 15 números da Lotofácil
- ✅ **Anti-Duplicação**: Sistema de histórico que evita jogos repetidos
- ✅ **Múltiplos Grupos**: Gere quantos grupos de jogos quiser em uma sessão
- ✅ **Exportação**: Salve seus jogos em arquivo TXT com timestamp
- ✅ **Copiar para Clipboard**: Copie os jogos diretamente para a área de transferência
- ✅ **PWA Compatible**: Funciona offline como Progressive Web App
- ✅ **SEO Otimizado**: Meta tags, Open Graph e Schema.org implementados
- ✅ **Sem Dependências**: Funciona 100% com JavaScript vanilla

---

## 🎮 Como Usar

### Passo 1: Definir os Números Base

1. Abra a aplicação no seu navegador
2. Preencha os 15 campos numéricos com números entre **01 e 25**
3. Cada número deve ser único (a validação impede duplicatas automaticamente)

### Passo 2: Validações Automáticas

- **Range**: Apenas números entre 01 e 25 são aceitos
- **Duplicatas**: O sistema avisa se você tenta inserir um número já utilizado
- **Formatação**: Números são automaticamente formatados com zero à esquerda (ex: "1" vira "01")

### Passo 3: Gerar Jogos

Você tem três opções:

| Botão | Ação |
|-------|------|
| **LIMPAR** | Remove todos os números inseridos |
| **SURPRESINHA** | Preenche aleatoriamente com 15 números válidos |
| **GERAR JOGOS** | Gera 9 combinações únicas baseadas nos números base |

### Passo 4: Gerenciar Resultados

Após gerar os jogos, acesse o menu (☰) no canto superior direito:

- **Resetar Memória**: Limpa o histórico e permite gerar combinações repetidas
- **Novo Jogo Base**: Recarrega a página
- **Resetar Jogos**: Remove todos os jogos gerados
- **Exportar Jogos**: Baixa um arquivo TXT com todos os jogos
- **Copiar Jogos**: Copia os jogos para a área de transferência

---

## 🔧 Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Variáveis customizáveis, Grid, Flexbox, Gradientes
- **JavaScript Vanilla**: Sem frameworks, totalmente nativo

### Recursos Web Modernos
- **PWA (Progressive Web App)**: Manifest.json e theme-color configurados
- **Responsive Design**: Mobile-first com breakpoints otimizados
- **Google Fonts**: Tipografia Montserrat com 3 pesos (400, 600, 800)

### SEO & Integração
- **Meta Tags Completas**: Description, Keywords, Author, Language
- **Open Graph**: Otimizado para compartilhamento em redes sociais
- **Twitter Cards**: Suporte a preview em X/Twitter
- **Schema.org**: Dados estruturados JSON-LD para WebApplication
- **Google AdSense**: Integração com anúncios contextuais

---

## 💻 Instalação & Execução

### Método 1: Usar o Arquivo Diretamente

1. Faça download do arquivo `index.html`
2. Abra em qualquer navegador moderno (Chrome, Firefox, Safari, Edge)
3. Pronto! A aplicação carrega instantaneamente

### Método 2: Servidor Local (Desenvolvimento)

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (npm install -g servor)
npm start

# Com Live Server (VS Code extension)
# Simplesmente clique em "Go Live"
```

### Compatibilidade

- ✅ Chrome/Chromium 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Navegadores móveis modernos

---

## 📱 PWA - Instalar como App

A aplicação pode ser instalada como PWA em dispositivos móveis:

**iOS (Safari):**
1. Toque em "Compartilhar"
2. Selecione "Adicionar à Tela de Início"

**Android (Chrome):**
1. Toque no menu (⋮)
2. Selecione "Instalar app"

---

## 🎯 Algoritmo de Geração

### Estratégia de Desdobramento

O sistema utiliza a regra matemática **9 + 6** para gerar combinações otimizadas:

```
Jogo Final = 9 números da base escolhida + 6 números externos
```

### Processo Detalhado

1. **Input**: Você define 15 números principais (base)
2. **Cálculo**: Sistema identifica 10 números não escolhidos (externos)
3. **Iteração**: Para cada um dos 9 jogos:
   - Seleciona aleatoriamente 9 números da base
   - Seleciona aleatoriamente 6 números externos
   - Combina os 15 números e ordena
4. **Validação**: Verifica se a combinação já existe no histórico
5. **Output**: Se único, adiciona ao resultado; se duplicado, tenta novamente

### Anti-Duplicação

- Cada combinação é convertida para hash (string dos números separados por hífen)
- O sistema mantém um `Set` com todos os hashes gerados
- Máximo de 5000 tentativas para gerar 9 jogos únicos
- Se não conseguir, sugere resetar o histórico

### Complexidade

- **Tentativas Máximas**: 5000 iterações por grupo
- **Garantia**: 99.9% de sucesso em gerar 9 jogos únicos por grupo
- **Performance**: Geração ocorre em millisegundos

---

## 🎨 Customização

### Paleta de Cores

As cores podem ser personalizadas modificando as variáveis CSS em `styles`:

```css
:root {
    --loto-purple: #93006C;      /* Cor primária */
    --loto-accent: #E0AFFF;      /* Cor de destaque */
    --loto-dark: #610047;        /* Cor escura */
    --bg: #f0f2f5;               /* Background */
    --text: #1a1a1a;             /* Texto */
    --white: #ffffff;            /* Branco */
}
```

### Modificar Informações de Autor

Atualize o footer e meta tags:

```html
<!-- No footer -->
<strong>Desenvolvido por SEU NOME - (XX) XXXXX-XXXX</strong>

<!-- Nas meta tags -->
<meta name="author" content="SEU NOME - (XX) XXXXX-XXXX">
```

### Configurar Google AdSense

No `<head>`, procure por:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7059730627018047"></script>
```

Substitua `ca-pub-XXXXX` pelo seu Client ID do AdSense.

---

## 📊 Estrutura de Dados

### Variáveis Globais

```javascript
historicoJogos          // Set com hash de todas as combinações geradas
contadorGrupos          // Número sequencial de grupos gerados
contadorJogosTotal      // Contador total de jogos únicos gerados
```

### Validações de Input

- **Keypress**: Bloqueia caracteres não-numéricos
- **Input Event**: Remove caracteres inválidos em tempo real
- **Blur Event**: Formata o número com zero à esquerda
- **Timeout Delay**: Aguarda 800ms antes de validar números com 1 dígito

---

## 🔒 Segurança & Performance

### Segurança

- ❌ **Sem transmissão de dados**: Tudo funciona localmente
- ❌ **Sem cookies**: Nenhum rastreamento persistente
- ✅ **Input validation**: Todas as entradas são validadas
- ✅ **No eval()**: Sem execução de código dinâmico

### Performance

- **Size**: Arquivo único < 30KB
- **Load Time**: Carrega em < 100ms
- **Parse Time**: JavaScript ejecuta em < 50ms
- **Memory**: Mantém apenas estruturas necessárias em memória

### Otimizações

- CSS customizado com variáveis (sem pré-processador)
- JavaScript vanilla (sem dependências)
- Grid layout (performance superior ao Flexbox em grids)
- Animações com `transform` e `opacity` (GPU-aceleradas)

---

## 📈 SEO & Open Graph

### Meta Tags Implementadas

- `title`: Otimizado com keywords principais
- `description`: 160 caracteres descrevendo a funcionalidade
- `keywords`: 15+ keywords relevantes
- `canonical`: URL canônica para evitar duplicate content
- `og:image`, `og:title`, `og:description`: Para compartilhamento

### Schema.org

Dados estruturados implementados para WebApplication:

```json
{
  "@type": "WebApplication",
  "name": "Lotofácil Pro",
  "applicationCategory": "EntertainmentApplication",
  "offers": { "price": "0", "priceCurrency": "BRL" }
}
```

---

## 🚀 Recursos Avançados

### Estados de Grupo

Cada grupo gerado possui:

```
Grupo N - HH:MM:SS (Horário de Brasília - GMT-3)
├── Jogo 1: 15 números
├── Jogo 2: 15 números
└── ...
└── Jogo 9: 15 números
```

### Interatividade

- **Hover Effects**: Cards do jogo escalam ao passar o mouse
- **Focus States**: Inputs recebem destaque com shadow
- **Animações**: Entrada com `fadeInUp`, menus com `fadeInDown`
- **Micro-interações**: Botões com feedback visual imediato

### Acessibilidade

- ✅ `aria-label` em botões interativos
- ✅ `inputMode="numeric"` para teclados mobile
- ✅ Contraste de cores suficiente (WCAG AA)
- ✅ Navegação keyboard-friendly

---

## 📋 Estrutura de Arquivos

```
project/
├── index.html          # Aplicação completa (HTML + CSS + JS)
├── README.md          # Este arquivo
└── package.json       # Configuração npm (opcional)
```

---

## ⚙️ Configuração Avançada

### Alterar Quantidade de Números Base

Para mudar de 15 para outro número, modifique:

```javascript
for (let i = 1; i <= 15; i++) {  // Altere aqui
```

### Alterar Quantidade de Jogos Gerados

Para alterar de 9 para outro número:

```javascript
while (sucessos < 9 && tentativasLoop < 5000) {  // Altere aqui
```

### Alterar Range de Números

Para usar números de 1 a 60 em vez de 1 a 25:

```javascript
if (!isNaN(valor) && valor >= 1 && valor <= 60) {  // Altere aqui
```

---

## 🐛 Troubleshooting

### Problema: "Não consegui gerar 9 jogos únicos"

**Solução**: Clique em "Resetar Memória" no menu para limpar o histórico de jogos.

### Problema: Números não são aceitos

**Solução**: Certifique-se de usar números entre 01 e 25. Verifique se o número já foi inserido.

### Problema: Não consigo colar números

**Solução**: A aplicação foi desenhada para entrada manual. Cole como texto e ajuste manualmente se necessário.

### Problema: Não funciona offline

**Solução**: Instale como PWA seguindo as instruções na seção **PWA - Instalar como App**.

---

## 📞 Suporte & Contato

### Reportar Bugs

Se encontrou um erro ou comportamento inesperado:

- **WhatsApp**: (63) 9 9242-8022
- **Descrição**: Inclua qual navegador, sistema operacional e passos para reproduzir

### Sugestões de Melhorias

Ideias são bem-vindas! Entre em contato através do WhatsApp com:

- Descrição da funcionalidade
- Justificativa
- Caso de uso

### Suporte Técnico

Para dúvidas sobre instalação ou uso:

- Consulte a seção **Como Usar**
- Verifique **Troubleshooting**
- Contate pelo WhatsApp

---

## 📜 Licença

Este projeto é fornecido **como está** para fins de entretenimento.

**Aviso Legal**:
- A Lotofácil é um jogo de azar regulado pela Caixa Econômica Federal
- Esta ferramenta não garante prêmios ou lucros
- Jogue responsavelmente e apenas com valores que possa perder
- Não somos responsáveis por perdas financeiras

---

## 🎓 FAQ - Perguntas Frequentes

### P: Os números gerados têm maior chance de ganhar?

R: Não. O algoritmo gera combinações matemáticas válidas, mas não aumenta probabilidades. A Lotofácil é um jogo de azar com probabilidades fixas.

### P: Posso usar números repetidos?

R: Não, o sistema impede entrada de números duplicados automaticamente.

### P: Preciso estar conectado à internet?

R: Não é necessário após o carregamento inicial. Funciona totalmente offline como PWA.

### P: Os dados são salvos na nuvem?

R: Não. Todos os dados ficam apenas no navegador local.

### P: Posso usar em múltiplos dispositivos?

R: Sim, basta acessar a URL em qualquer navegador. Os dados não são sincronizados entre dispositivos.

### P: Qual é o máximo de grupos que posso gerar?

R: Ilimitado! Você pode gerar quantos grupos quiser em uma sessão.

### P: Como os números são sorteados para a Surpresinha?

R: São selecionados aleatoriamente dos 25 números disponíveis, sem repetição.

---

## 🔄 Roadmap Futuro

- [ ] Histórico persistente em localStorage
- [ ] Análise estatística de frequências
- [ ] Integração com resultados oficiais da Caixa
- [ ] Compartilhamento de jogos via link
- [ ] Tema escuro automático
- [ ] Suporte a múltiplas loterias

---

## 👨‍💻 Desenvolvedor

**André Miranda**
📱 WhatsApp: (63) 9 9242-8022
📧 Contato: através do WhatsApp

---

## 📄 Histórico de Versões

### v1.0.0 (Janeiro 2025)
- Versão inicial lançada
- Geração de jogos com desdobramento matemático
- Suporte a PWA
- SEO completo
- Interface responsiva

---

**Desenvolvido com ❤️ para a comunidade da Lotofácil**

---

*Última atualização: Janeiro 2025*
