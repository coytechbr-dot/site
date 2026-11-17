/**
 * ============================================================================
 * COYTECH — Modular High-Ticket B2B Components (Regra Cromática 60-30-10)
 * - 60% Branco (#FFFFFF): Superfície dos cards e blocos principais
 * - 30% Azul Acinzentado (#1E2D3D / #3D5A73 / #D5E1EC): Tipografia e bordas
 * - 10% Azul Elétrico (#0066FF): Ícones de destaque e micro-interações
 * ============================================================================
 */

(function (global) {
  'use strict';

  const WHATSAPP_CONFIG = {
    phone: '5511999999999',
    defaultMessage:
      'Olá! Vim pela Landing Page da CoyTech e gostaria de agendar um Diagnóstico Gratuito sobre Sistemas Sob Medida e Automação.'
  };

  /**
   * 1. Seção de Benefícios (A Dor e a Solução)
   * 4 Cards brancos (60%) com bordas em Azul Acinzentado (30%) e ícones na cor de destaque (10%)
   */
  const BENEFITS_DATA = [
    {
      id: 'reducao-custos',
      tag: 'Automação de tarefas repetitivas',
      title: 'Redução de Custos',
      description:
        'Elimine o retrabalho humano no backoffice, financeiro e operação. Automatizamos rotinas manuais para enxugar seu custo operacional (OPEX) imediatamente.',
      metricLabel: 'Impacto médio no OPEX',
      metricValue: '-42% Custo Operacional',
      icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`
    },
    {
      id: 'aumento-receita',
      tag: 'Dados precisos para vendas',
      title: 'Aumento de Receita',
      description:
        'Transforme dados brutos em inteligência comercial. Acelere a triagem de oportunidades, reduza o ciclo de vendas e aumente sua margem líquida.',
      metricLabel: 'Retorno sobre investimento',
      metricValue: '+3.4x ROI no 1º Ano',
      icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>`
    },
    {
      id: 'eficiencia-interligada',
      tag: 'Fim dos silos de informação',
      title: 'Eficiência Interligada',
      description:
        'Conectamos ERP, CRM, bancos e operação em um fluxo único e auditável. Seus departamentos passam a falar a mesma língua sem planilhas paralelas.',
      metricLabel: 'Integração entre setores',
      metricValue: '100% API Sincronizada',
      icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>`
    },
    {
      id: 'decisao-qualificada',
      tag: 'Dashboards executivos em tempo real',
      title: 'Decisão Qualificada',
      description:
        'Visibilidade executiva instantânea sobre faturamento, gargalos e margem de contribuição com alertas automáticos baseados em sistemas inteligentes.',
      metricLabel: 'Telemetria para Diretoria',
      metricValue: 'Tempo Real 24/7',
      icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>`
    }
  ];

  /**
   * 2. Seção de Metodologia (Timeline de 4 Passos)
   */
  const METHODOLOGY_STEPS_DATA = [
    {
      number: '01',
      phase: 'Passo 1 • Imersão Financeira e Operacional',
      title: '1. Diagnóstico de Gargalos.',
      description:
        'Mapeamos sua operação ponta a ponta para identificar exatamente onde o dinheiro e o tempo da sua equipe estão vazando em processos manuais, retrabalho e falhas de integração.',
      deliverables: [
        'Auditoria de fluxos manuais e sistemas atuais',
        'Cálculo de impacto financeiro por gargalo',
        'Priorização das automações de maior ROI'
      ]
    },
    {
      number: '02',
      phase: 'Passo 2 • Arquitetura Sob Medida',
      title: '2. Planejamento da Solução.',
      description:
        'Desenhamos o blueprint técnico combinando sistemas sob medida e automação de rotinas, definindo integrações com seu ERP/CRM, regras de negócio e metas claras de performance.',
      deliverables: [
        'Arquitetura de dados, APIs e Automação de Rotinas',
        'Protótipo executivo validado com decisores',
        'Cronograma de entrega sem risco operacional'
      ]
    },
    {
      number: '03',
      phase: 'Passo 3 • Rollout sem Atrito',
      title: '3. Implementação e Treinamento.',
      description:
        'Colocamos a solução em produção sem interromper o faturamento da sua empresa e capacitamos sua equipe na prática para garantir adoção imediata e zero resistência interna.',
      deliverables: [
        'Deploy seguro integrado ao ecossistema atual',
        'Treinamento prático de gestores e usuários',
        'Playbooks operacionais e homologação assistida'
      ]
    },
    {
      number: '04',
      phase: 'Passo 4 • Sustentação e Escala',
      title: '4. Monitoramento Contínuo.',
      description:
        'Acompanhamos ativamente os indicadores de performance, disponibilidade das integrações e estabilidade dos sistemas inteligentes, evoluindo a solução conforme sua operação escala.',
      deliverables: [
        'Observabilidade 24/7 com alertas preventivos',
        'Relatórios executivos de economia gerada',
        'Evolução contínua de novas funcionalidades'
      ]
    }
  ];

  /**
   * 3. Seção de FAQ (Dúvidas de Decisores B2B High-Ticket)
   */
  const FAQ_DATA = [
    {
      question: 'Preciso substituir meu ERP ou CRM atual (SAP, TOTVS, Salesforce) para implementar as soluções?',
      answer:
        'Não. Nossas soluções são projetadas para se conectar nativamente via API ao seu ecossistema atual (SAP, TOTVS, Salesforce, Power BI, bancos e planilhas). Eliminamos o trabalho manual entre os departamentos sem exigir que você troque as ferramentas que já funcionam.'
    },
    {
      question: 'Qual a diferença prática entre os Sistemas Sob Medida e os Sistemas Modelos (Plug & Play)?',
      answer:
        'Os Sistemas Sob Medida são construídos do zero para regras de negócio exclusivas que se adaptam ao jeito de trabalhar da sua empresa. Já os Sistemas Modelos (Plug & Play) possuem 80% da arquitetura pronta e validada para resolver dores recorrentes (automação de rotinas, portais operacionais, conciliação e dashboards), permitindo implementação acelerada em poucas semanas.'
    },
    {
      question: 'Em quanto tempo o investimento se paga (Payback e ROI)?',
      answer:
        'Nosso foco é estritamente financeiro. No Diagnóstico Gratuito, priorizamos os gargalos de maior custo operacional. Na média dos nossos projetos B2B, a redução de horas manuais e a eliminação de falhas operacionais geram payback integral entre 2 e 5 meses após a entrada em produção.'
    },
    {
      question: 'Como funciona a segurança dos dados corporativos nos sistemas e automações?',
      answer:
        'Implementamos arquiteturas privadas com isolamento total de dados, criptografia ponta a ponta, controle de acesso por cargo (RBAC) e conformidade rigorosa com a LGPD. As informações estratégicas da sua empresa permanecem protegidas e auditáveis em tempo real.'
    }
  ];

  /**
   * Renderiza os 4 Cards de Benefícios em #benefits-grid
   */
  function renderBenefits(containerId = 'benefits-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = BENEFITS_DATA.map(
      (item, idx) => `
      <article
        class="card-b2b rounded-2xl p-7 flex flex-col justify-between reveal delay-${(idx + 1) * 100}"
        aria-labelledby="benefit-title-${item.id}"
      >
        <div>
          <div class="flex items-center justify-between gap-3 mb-6">
            <div class="icon-box-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              ${item.icon}
            </div>
            <span class="text-[11px] font-mono font-bold text-[#3d5a73] bg-[#f3f7fa] border border-[#d5e1ec] px-2.5 py-1 rounded-full">
              0${idx + 1}
            </span>
          </div>

          <h3 id="benefit-title-${item.id}" class="text-xl font-extrabold text-[#16222f] mb-1.5 tracking-tight">
            ${item.title}
          </h3>

          <p class="text-xs font-mono font-bold text-[#0066ff] uppercase tracking-wider mb-3">
            ${item.tag}
          </p>

          <p class="text-sm text-[#3d5a73] leading-relaxed mb-6">
            ${item.description}
          </p>
        </div>

        <div class="pt-4 border-t border-[#d5e1ec] flex items-center justify-between text-xs">
          <span class="text-[#52738e] font-medium">${item.metricLabel}</span>
          <span class="font-mono font-bold text-[#1e2d3d]">${item.metricValue}</span>
        </div>
      </article>
    `
    ).join('');
  }

  /**
   * Renderiza a Timeline de 4 Passos em #methodology-timeline (Sobre fundo #080D16)
   */
  function renderMethodologyTimeline(containerId = 'methodology-timeline') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = METHODOLOGY_STEPS_DATA.map(
      (step, idx) => `
      <div class="relative pl-12 md:pl-0 reveal delay-${(idx + 1) * 100}">
        <div class="md:grid md:grid-cols-12 md:gap-8 items-start group">
          <!-- Coluna Esquerda: Tag de Fase -->
          <div class="md:col-span-4 md:text-right md:pr-8 mb-2.5 md:mb-0 pt-1">
            <span class="inline-block font-mono text-xs font-bold uppercase tracking-wider text-[#38bdf8] bg-[#121C2D] border border-[#22d3ee]/35 px-3 py-1 rounded-full">
              ${step.phase}
            </span>
          </div>

          <!-- Nó Central da Timeline (Destaque Cyan sobre #080D16) -->
          <div class="absolute left-0 md:left-1/3 md:-ml-5 top-0 flex items-center justify-center">
            <div class="w-10 h-10 rounded-xl bg-[#121C2D] border-2 border-[#22d3ee] text-white font-mono font-bold text-sm flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.28)] group-hover:bg-[#22d3ee] group-hover:text-[#080D16] transition-all duration-300">
              ${step.number}
            </div>
          </div>

          <!-- Coluna Direita: Card #121C2D com Borda Sutil em Cyan e Textos em Branco -->
          <div class="md:col-span-8 md:pl-8">
            <article class="rounded-2xl p-6 lg:p-7 bg-[#121C2D] border border-[#22d3ee]/30 hover:border-[#22d3ee] shadow-[0_18px_40px_-15px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300">
              <h3 class="text-xl font-extrabold text-white mb-2.5">
                ${step.title}
              </h3>
              <p class="text-sm text-[#d5e1ec] leading-relaxed mb-5">
                ${step.description}
              </p>
              <div class="pt-4 border-t border-white/10 grid sm:grid-cols-3 gap-2.5">
                ${step.deliverables
                  .map(
                    (item) => `
                  <div class="flex items-start gap-2 text-xs text-white font-medium bg-white/5 border border-[#22d3ee]/20 rounded-lg p-2.5">
                    <svg class="w-4 h-4 text-[#22d3ee] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>${item}</span>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </article>
          </div>
        </div>
      </div>
    `
    ).join('');
  }

  /**
   * Renderiza o Acordeão de FAQ em #faq-accordion
   */
  function renderFaqAccordion(containerId = 'faq-accordion') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = FAQ_DATA.map(
      (item, idx) => `
      <div class="card-b2b rounded-2xl overflow-hidden reveal delay-${(idx + 1) * 100}">
        <button
          type="button"
          class="faq-trigger w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
          aria-expanded="${idx === 0 ? 'true' : 'false'}"
          data-faq-index="${idx}"
        >
          <span class="text-base font-extrabold text-[#16222f]">${item.question}</span>
          <span class="faq-icon w-8 h-8 rounded-lg bg-[#f3f7fa] border border-[#d5e1ec] flex items-center justify-center text-[#0066ff] shrink-0 transition-transform duration-300 ${
            idx === 0 ? 'rotate-180' : ''
          }">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        <div
          class="faq-content px-6 pb-5 text-sm text-[#3d5a73] leading-relaxed border-t border-[#d5e1ec] pt-4 ${
            idx === 0 ? 'block' : 'hidden'
          }"
        >
          ${item.answer}
        </div>
      </div>
    `
    ).join('');
  }

  global.CoyTechComponents = {
    WHATSAPP_CONFIG,
    BENEFITS_DATA,
    METHODOLOGY_STEPS_DATA,
    FAQ_DATA,
    renderBenefits,
    renderMethodologyTimeline,
    renderFaqAccordion
  };
})(window);
