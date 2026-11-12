// Auto-generated seed data for FortiQuest NSE4 questions
// Total questions: 92 (Doc numbers 1 to 93, excluding 73)
// All answers loaded from official exam dump highlights and corrected table
import { Question } from '../types/quiz';

export const SEED_VERSION = 6;

export const SEED_QUESTIONS: Question[] = [
  {
    "id": "q-1",
    "docNumber": 1,
    "origin": "questao 1 do documento \"NSE4_FGT_AD-7.6\" = questao 38 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibit: FortiGate SD-WAN zone configuration GUI (SD-WAN Zones, SD-WAN Rules, Performance SLAs with Underlay and overlay zones)",
        "url": "exhibits/q1-1.jpeg"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "An SD-WAN zone configuration on the FortiGate GUI is shown. Based on the exhibit, which statement is true?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The Underlay zone contains no member."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The virtual-wan-link and overlay zones can be deleted."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The Underlay zone is the zone by default."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "port2 and port3 are not assigned to a zone."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "SD-WAN",
      "GUI"
    ],
    "warnings": [],
    "domain": "routing",
    "explanation": "**Conceito:** zona SD-WAN sem membros aparece na GUI sem o \"+\" para expandir.\n- ✅ A: a Underlay não tem \"+\", então está vazia.\n- ❌ B: zonas com membros, como a virtual-wan-link e a overlay, não podem ser apagadas.\n- ❌ C: a zona padrão é a virtual-wan-link.\n- ❌ D: o gráfico mostra os 4 membros (port1 a port4) em zonas."
  },
  {
    "id": "q-2",
    "docNumber": 2,
    "origin": "questao 2 do documento \"NSE4_FGT_AD-7.6\" = questao 9 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "An administrator wants to configure dead peer detection (DPD) on IPsec VPN for detecting dead tunnels. The requirement is that FortiGate sends DPD probes only when there is no inbound traffic. Which DPD mode on FortiGate meets this requirement?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "On Demand"
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Enabled"
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "On Idle"
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Disabled"
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "IPsec",
      "VPN",
      "DPD"
    ],
    "warnings": [],
    "domain": "vpn",
    "explanation": "**Conceito:** o DPD On Demand só manda probes quando há tráfego saindo e nada voltando.\n- ✅ A: On Demand atende o requisito \"só sem tráfego de entrada\".\n- ❌ B: \"Enabled\" não é um modo de DPD.\n- ❌ C: On Idle manda probes quando o túnel está ocioso, sem tráfego algum.\n- ❌ D: Disabled não manda probes, só responde."
  },
  {
    "id": "q-3",
    "docNumber": 3,
    "origin": "questao 3 do documento \"NSE4_FGT_AD-7.6\" = questao 33 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "img3-1",
        "type": "image",
        "url": "exhibits/q3-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b2",
        "type": "terminal",
        "content": "FortiGate # diagnose debug rating\nLocale : english\nService : Web-filter\nStatus : Enable\nLicense : Contract\nNum. Of servers : 1\nProtocol : https\nPort : 8888\nAnycast : Disable\nDefault servers : Not included\n\n-- Server List (Wed Sep 20 09:22:42 2023) --\nIP: 10.0.1.241  Weight: -244  RTT: 2  Flags: I  TZ: 0  Fortiguard-requests: 122  Curr Lost: 0  Total Lost: 0  Updated Time: Wed Sep 20 09:21:55 2023"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "Which two statements about the FortiGuard connection are true? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The weight increases as the number of failed packets rises."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "You can configure unreliable protocols to communicate with FortiGuard Server."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "FortiGate identified the FortiGuard Server using DNS lookup."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "FortiGate is using the default port for FortiGuard communication."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "B"
    ],
    "tags": [
      "FortiGuard",
      "CLI",
      "Web Filter"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** `diagnose debug rating` lista os servidores FortiGuard, ordenados por weight. Peso maior = servidor pior.\n- ✅ A: o weight sobe com pacotes perdidos e desce com respostas.\n- ✅ B: dá para configurar UDP (`set protocol udp`), que não é confiável.\n- ❌ C: servidor descoberto por DNS teria o flag D. Aqui só aparece I.\n- ❌ D: o padrão do HTTPS é 443, e o output mostra 8888."
  },
  {
    "id": "q-4",
    "docNumber": 4,
    "origin": "questao 4 do documento \"NSE4_FGT_AD-7.6\" = questao 12 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "What are two features of FortiGate FSSO agentless polling mode? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "FortiGate uses the AD server as the collector agent."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "FortiGate uses the SMB protocol to read the event viewer logs from the DCs."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "FortiGate does not support workstation check."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "FortiGate directs the collector agent to use a remote LDAP server."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "B",
      "C"
    ],
    "tags": [
      "FSSO",
      "Authentication"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** no FSSO agentless, o próprio FortiGate é o collector e lê os logs dos DCs via SMB.\n- ❌ A: o collector é o FortiGate, não o AD.\n- ✅ B: lê o Event Viewer dos DCs via SMB (TCP 445).\n- ✅ C: não tem workstation check, que é recurso do collector externo.\n- ❌ D: no agentless não existe collector agent."
  },
  {
    "id": "q-5",
    "docNumber": 5,
    "origin": "questao 5 do documento \"NSE4_FGT_AD-7.6\" = questao 36 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "An administrator wants to form an HA cluster using the FGCP protocol. Which two requirements must the administrator ensure both members fulfill? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "They must have the same hard drive configuration."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "They must have the same number of configured VDOMs."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "They must have the heartbeat interfaces in the same subnet."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "They must have the same HA group ID."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "D"
    ],
    "tags": [
      "HA",
      "FGCP"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** para formar um cluster FGCP, os membros precisam do mesmo hardware, firmware e licenças, e do mesmo group ID, group name e senha.\n- ✅ A: mesmo número e tamanho de discos.\n- ❌ B: as VDOMs são sincronizadas depois, então não precisam bater antes.\n- ❌ C: o heartbeat usa IPs 169.254.0.x atribuídos automaticamente; o admin não configura subnet.\n- ✅ D: o group ID identifica o cluster."
  },
  {
    "id": "q-6",
    "docNumber": 6,
    "origin": "questao 6 do documento \"NSE4_FGT_AD-7.6\" = questao 25 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibit: IPsec tunnel configuration (HQ-NGFW phase 2 ToBR1 vs BR1-FGT phase 2 ToHQ)",
        "url": "exhibits/q6-1.jpeg"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "A network administrator is troubleshooting an IPsec tunnel between two FortiGate devices. The administrator has determined that phase 1 status is up, but phase 2 fails to come up. Based on the phase 2 configuration shown in the exhibit, which two configuration changes will bring phase 2 up? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "On BR1-FGT, set Remote Address to 10.0.11.0/255.255.255.0."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "On HQ-NGFW. enable Diffie-Hellman Group 2."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "On BR1-FGT. set Seconds to 43200."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "On HQ-NGFW. set Encryption to AES256."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "D"
    ],
    "tags": [
      "IPsec",
      "VPN",
      "Phase 2"
    ],
    "warnings": [],
    "domain": "vpn",
    "explanation": "**Conceito:** com a Phase 1 up e a Phase 2 down, verifique selectors espelhados, uma proposta em comum e DH (se houver PFS).\n- ✅ A: o BR1 tinha 10.11.0.0 no lugar de 10.0.11.0 (octetos trocados).\n- ❌ B: o grupo DH 5 já está nos dois lados.\n- ❌ C: key lifetime diferente não impede a Phase 2.\n- ✅ D: o HQ só tinha AES128 e o BR1 só AES256. Com AES256 no HQ, passa a haver proposta em comum."
  },
  {
    "id": "q-7",
    "docNumber": 7,
    "origin": "questao 7 do documento \"NSE4_FGT_AD-7.6\" = questao 27 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibit: Edit SSL/SSH Inspection Profile showing Server certificate SNI check set to Strict",
        "url": "exhibits/q7-1.jpeg"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "What would be the impact of these settings on the Server certificate SNI check configuration on FortiGate?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "FortiGate will accept and use the CN in the server certificate for URL filtering if the SNI does not match the CN or SAN fields."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "FortiGate will accept the connection with a warning if the SNI does not match the CN or SAN fields."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "FortiGate will close the connection if the SNI does not match the CN or SAN fields."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "FortiGate will close the connection if the SNI does not match the CN and SAN fields."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "SSL/SSH Inspection",
      "SNI",
      "Certificate"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** o SNI check em Strict fecha a conexão se o SNI não bater com o CN ou o SAN do certificado.\n- ❌ A: usar o CN para filtrar é o comportamento do modo Enable.\n- ❌ B: nenhum modo aceita \"com aviso\".\n- ✅ C: Strict fecha a conexão.\n- ❌ D: o guide diz \"CN **or** SAN\", não \"and\"."
  },
  {
    "id": "q-8",
    "docNumber": 8,
    "origin": "questao 8 do documento \"NSE4_FGT_AD-7.6\" = questao 21 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibits."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibits: Application sensor (Priority 1: Excessive-Bandwidth Block, Priority 2: Google Monitor) and Firewall policy (Proxy-based, certificate-inspection)",
        "url": "exhibits/q8-1.jpeg"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "You have implemented the application sensor and the corresponding firewall policy as shown in the exhibits. You cannot access any of the Google applications, but you are able to access www.fortinet.com. Which two actions would you take to resolve the issue? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Set SSL inspection to deep-content inspection."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Move up Google in the Application and Filter Overrides section to set its priority to 1."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Add \"Google\".com to the URL category in the security profile."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Change the Inspection mode to Flow-based."
      },
      {
        "id": "opt-E",
        "letter": "E",
        "text": "Set the action for Google in the Application and Filter Overrides section to Allow."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "B"
    ],
    "tags": [
      "Application Control",
      "Firewall Policy"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** os overrides do App Control são avaliados de cima para baixo, e o primeiro que casa decide. Apps de nuvem precisam de deep inspection para serem identificados.\n- ✅ A: deep inspection permite identificar os apps do Google.\n- ✅ B: com o Google em prioridade 1, ele casa antes do Excessive-Bandwidth→Block.\n- ❌ C: URL category é do Web Filter, que está desligado.\n- ❌ D: o modo flow/proxy não é a causa.\n- ❌ E: Monitor já deixa passar, e o problema é a ordem."
  },
  {
    "id": "q-9",
    "docNumber": 9,
    "origin": "questao 9 do documento \"NSE4_FGT_AD-7.6\" = questao 44 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "img9-1",
        "type": "image",
        "url": "exhibits/q9-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b2",
        "type": "terminal",
        "content": "config system global\n    set av-failopen one-shot\nend\nconfig ips global\n    set fail-open enable\nend"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "Based on this partial configuration, what are the two possible outcomes when FortiGate enters conserve mode? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "FortiGate drops new sessions requiring inspection."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Administrators must restart FortiGate to allow new sessions."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Administrators cannot change the configuration."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "FortiGate skips quarantine actions."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "C",
      "D"
    ],
    "tags": [
      "Conserve Mode",
      "CLI",
      "IPS"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** em conserve mode com fail-open, as sessões passam sem inspeção. Mudanças de config e quarantine ficam bloqueadas.\n- ❌ A: descartar sessões só aconteceria com fail-open desligado.\n- ❌ B: não precisa reiniciar, porque as sessões já passam.\n- ✅ C: o FortiGate não aceita mudanças de configuração.\n- ✅ D: ações de quarantine não rodam."
  },
  {
    "id": "q-10",
    "docNumber": 10,
    "origin": "questao 10 do documento \"NSE4_FGT_AD-7.6\" = questao 40 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "An administrator has configured a dialup IPsec VPN on FortiGate with add-route enabled. However, the static route is not showing in the routing table. Which two statements about this scenario are correct? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The administrator must use a policy route instead of a static route for add-route to work properly."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The administrator must ensure phase 2 is successfully established."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The administrator must define the remote network correctly in the phase 2 selectors."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The administrator must enable a dynamic routing protocol on the dialup interface."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "B",
      "C"
    ],
    "tags": [
      "IPsec",
      "VPN",
      "Routing"
    ],
    "warnings": [],
    "domain": "vpn",
    "explanation": "**Conceito:** o add-route cria a rota estática para a rede do cliente dial-up quando a Phase 2 sobe, usando a rede do selector.\n- ❌ A: policy route não tem relação com o add-route.\n- ✅ B: sem Phase 2 up, não há rota.\n- ✅ C: a rota vem da rede remota do selector.\n- ❌ D: protocolo dinâmico é independente do add-route."
  },
  {
    "id": "q-11",
    "docNumber": 11,
    "origin": "questao 11 do documento \"NSE4_FGT_AD-7.6\" = questao 35 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibit: New RADIUS Server configuration (Name: FortiAuthenticator-RADIUS, Include in every user group enabled)",
        "url": "exhibits/q11-1.jpeg"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "An administrator added a configuration for a new RADIUS server While configuring, the administrator enabled Include in every user group What is the impact of enabling Include in every user group in a RADIUS configuration?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "This option places the RADIUS server, and all users who can authenticate against that server, into every FortiGate user group."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "This option places all FortiGate and groups required to authenticate into the RADIUS server, which, in this case, is FortiAuthenticator."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "This option places all users into every RADIUS user group, including groups that are used for the LDAP server on FortiGate."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "This option places the RADIUS server, and all users who can authenticate against that server, into every RADIUS group."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "RADIUS",
      "Authentication"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** \"Include in every user group\" põe o servidor RADIUS em todos os user groups **do FortiGate**.\n- ✅ A: qualquer usuário válido no RADIUS entra em todos os grupos do FortiGate.\n- ❌ B: o FortiGate é cliente e não cria nada no RADIUS.\n- ❌ C: fala em grupo RADIUS e mistura LDAP.\n- ❌ D: \"every RADIUS group\" não existe, porque o FortiGate não mexe nos grupos do servidor."
  },
  {
    "id": "q-12",
    "docNumber": 12,
    "origin": "questao 12 do documento \"NSE4_FGT_AD-7.6\" = questao 8 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "You have created a web filter profile named restrictmedia-profile with a daily category usage quota. When you are adding the profile to the firewall policy, the restrictmedia-profile is not listed in the available web profile drop down. What could be the reason?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The web filter profile is already referenced in another firewall policy."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The firewall policy is in no-inspection mode instead of deep-inspection."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The naming convention used in the web filter profile is restricting it in the firewall policy."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The inspection mode in the firewall policy is not matching with web filter profile feature set."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "D"
    ],
    "tags": [
      "Web Filter",
      "Firewall Policy"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** o feature set do profile (flow ou proxy) precisa bater com o inspection mode da policy, senão o profile não aparece.\n- ❌ A: um profile pode ser usado em várias policies.\n- ❌ B: no-inspection e deep-inspection são profiles SSL, não inspection modes.\n- ❌ C: o nome do profile não afeta nada.\n- ✅ D: o profile com cota é proxy-based, e a policy está em flow."
  },
  {
    "id": "q-13",
    "docNumber": 13,
    "origin": "13. Refer to the exhibits.",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibits."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibits: Network diagram (PC1, PC2, PC3 behind FortiGate), Firewall policy, Dynamic IP Pool (One-to-One 100.65.0.110-100.65.0.111)",
        "url": "exhibits/q13-1.jpeg"
      },
      {
        "id": "img13-2",
        "type": "image",
        "url": "exhibits/q13-2.jpeg",
        "pending": false,
        "label": "Exhibit 2"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "A diagram of a FortiGate device connected to the network, as well as the firewall policy and IP pool configuration on the FortiGate device are shown. Two PCs. PC1 and PC2, are connected behind FortiGate and can access the internet successfully. However, when the administrator adds a third PC to the network (PC3), the PC cannot connect to the internet. Based on the information shown in the exhibit, which two configuration options can the administrator use to fix the connectivity issue for PC3? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "In the system settings, set Multiple Interface Policies to enable."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "in the IP pool configuration, set end ip to 100.65.0.112."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "In the firewall policy, set match-vip to enable using CLI."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "In the IP pool configuration, set type to overload."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "B",
      "D"
    ],
    "tags": [
      "NAT",
      "IP Pool",
      "Firewall Policy"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** um IP Pool One-to-One com 2 IPs atende só 2 hosts. Para mais, aumente o pool ou use Overload (PAT).\n- ❌ A: Multiple Interface Policies não tem relação com IP pool.\n- ✅ B: com end-ip .112, o pool passa a ter 3 IPs.\n- ❌ C: match-vip é de deny com VIP (DNAT).\n- ✅ D: Overload compartilha cada IP entre vários hosts, por porta."
  },
  {
    "id": "q-14",
    "docNumber": 14,
    "origin": "questao 14 do documento \"NSE4_FGT_AD-7.6\" = questao 41 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Which two statements are correct when the FortiGate device enters conserve mode? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "FortiGate refuses to accept configuration changes."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "FortiGate halts complete system operation and requires a reboot to regain available resources."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "FortiGate continues to transmit packets without IPS inspection when the fail-open global setting in IPS is enabled."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "FortiGate continues to run critical security actions, such as quarantine."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "C"
    ],
    "tags": [
      "Conserve Mode",
      "System"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** em conserve mode, o FortiGate não aceita mudanças de config e não roda quarantine. Com fail-open no IPS, o tráfego passa sem inspeção de IPS.\n- ✅ A: recusa mudanças de configuração.\n- ❌ B: não trava e não exige reboot; sai sozinho do conserve mode.\n- ✅ C: com IPS fail-open enable, transmite sem inspeção de IPS.\n- ❌ D: quarantine não roda."
  },
  {
    "id": "q-15",
    "docNumber": 15,
    "origin": "questao 15 do documento \"NSE4_FGT_AD-7.6\" = questao 29 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "image",
        "pending": false,
        "label": "Exhibits: FortiGate HA cluster topology, Current HA status CLI, New FortiGate HA configuration (HQ-NGFW-1 priority 90 override disable, HQ-NGFW-2 priority 110 override enable)",
        "url": "exhibits/q15-1.jpeg"
      },
      {
        "id": "img15-2",
        "type": "image",
        "url": "exhibits/q15-2.jpeg",
        "pending": false,
        "label": "Exhibit 2"
      },
      {
        "id": "b2",
        "type": "text",
        "content": "Based on the current HA status, an administrator updates the override and priority parameters on HQ-NGFW-1 and HQ-NGFW-2 as shown in the exhibits. What would be the expected outcome in the HA cluster?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The HA cluster will become out of sync because the override setting must match on all HA members.."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "HQ-NGFW-1 will synchronize the override disable setting with HQ-NGFW-2."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "HQ-NGFW-1 will remain the primary because HQ-NGFW-2 has lower priority."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "HQ-NGFW-2 will take over as the primary because it has the override enable setting and Higher priority than HQ-NGFW-1."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "D"
    ],
    "tags": [
      "HA",
      "FGCP",
      "Failover"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** override e priority não são sincronizados. Com override enable, a priority pesa antes do uptime.\n- ❌ A: override diferente entre os membros não gera out-of-sync.\n- ❌ B: override não é sincronizado.\n- ❌ C: o NGFW-2 tem priority 110, maior que a 90 do NGFW-1.\n- ✅ D: o NGFW-2, com override e priority maior, assume como primary."
  },
  {
    "id": "q-16",
    "docNumber": 16,
    "origin": "questao 16 do documento \"NSE4_FGT_AD-7.6\" = questao 6 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibit: Firewall policy row (Source: HQ_SUBNET, Remote-users; Service: ALL_ICMP, HTTPS, HTTP; Action: ACCEPT; NAT: Standard)",
        "url": "exhibits/q16-1.jpeg"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "When attempting to access an external website using an active authentication method, the user is not presented with a login prompt. What is the most likely reason for this situation?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "No matching user account exists for this user."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The Remote-users group must be set up correctly in the FSSO configuration."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The Remote-users group is not added to the Destination."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The Service DNS is required in the firewall policy."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "D"
    ],
    "tags": [
      "Authentication",
      "Firewall Policy"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** para o prompt de autenticação ativa aparecer, o navegador precisa resolver o nome. Sem DNS liberado na policy, o prompt não aparece.\n- ❌ A: usuário inexistente daria falha **depois** do prompt.\n- ❌ B: FSSO é autenticação passiva.\n- ❌ C: user group vai sempre no Source.\n- ✅ D: falta liberar o serviço DNS na policy."
  },
  {
    "id": "q-17",
    "docNumber": 17,
    "origin": "questao 17 do documento \"NSE4_FGT_AD-7.6\" = questao 37 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "When configuring firewall policies which of the following is true regarding the policy ID? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "A policy ID cannot be modified once a policy is created."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "A firewall policy ID identifies the order of policy execution in firewall policies."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "It is mandatory to provide a policy ID while creating a firewall policy regardless of GUI or CLI."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "You can create a policy in CLI with policy ID 0."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "D"
    ],
    "tags": [
      "Firewall Policy",
      "CLI"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** o ID da policy é só um identificador. A ordem de execução é a posição na lista.\n- ✅ A: o ID não pode ser alterado depois que a policy é criada.\n- ❌ B: quem define a ordem é a posição na lista, não o ID.\n- ❌ C: na GUI, o ID é atribuído automaticamente.\n- ✅ D: `edit 0` no CLI cria a policy com o próximo ID livre."
  },
  {
    "id": "q-18",
    "docNumber": 18,
    "origin": "questao 18 do documento \"NSE4_FGT_AD-7.6\" = questao 39 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibits."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibits: Network diagram (HQ-PC-1 10.0.11.50 -> HQ-NGFW WAN 100.65.0.101 -> Router -> BR1-FGT 100.65.1.111), NAT IP pool configuration, Firewall policies",
        "url": "exhibits/q18-1.jpeg"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "The exhibits show a diagram of a FortiGate device connected to the network, as well as the IP pool configuration and firewall policy objects. The WAN (port2) interface has the IP address 100.65.0.101/24. The LAN (port4) interface has the IP address 10.0.11.254/24. Which IP address will be used to source NAT (SNAT) the traffic, if the user on HQ-PC-1 (10.0.11.50) pings the IP address of BR-FGT (100.65.1.111)?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "100.65.0.101"
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "100.65.0.49"
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "100.65.0.149"
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "100.65.0.99"
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "D"
    ],
    "tags": [
      "NAT",
      "Firewall Policy",
      "IP Pool"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** o SNAT usa o IP Pool da policy que casou. O ping (ICMP) casa a policy \"PING traffic\".\n- ❌ A: o IP da WAN só seria usado em NAT sem IP pool.\n- ❌ B: o SNAT-Pool (.49) é da policy TCP.\n- ❌ C: o SNAT-Remote (.149) é da policy IGMP.\n- ✅ D: o SNAT-Remote1 = 100.65.0.99."
  },
  {
    "id": "q-19",
    "docNumber": 19,
    "origin": "questao 19 do documento \"NSE4_FGT_AD-7.6\" = questao 47 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "An administrator manages a FortiGate model that supports NTurbo. How does NTurbo acceleration enhance antivirus performance?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "For flow-based inspection. NTurbo establishes a dedicated data path to redirect traffic between the IPS engine and FortiGate ingress and egress interfaces."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "For flow-based inspection. NTurbo creates two inspection sessions on the FortiGate device."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "For proxy-based inspection. NTurbo offloads traffic to the content processor."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "For proxy-based inspection. NTurbo buffers the whole file and then sends it to the antivirus engine."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "NTurbo",
      "Antivirus",
      "Hardware Acceleration"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** o NTurbo (flow-based) cria um data path dedicado entre as interfaces e o IPS engine, via NP.\n- ✅ A: data path dedicado em flow-based.\n- ❌ B: o NTurbo não duplica sessões.\n- ❌ C: NTurbo não atua em proxy, e offload para o CP é o IPSA.\n- ❌ D: bufferizar o arquivo inteiro é o AV em proxy, não o NTurbo."
  },
  {
    "id": "q-20",
    "docNumber": 20,
    "origin": "questao 20 do documento \"NSE4_FGT_AD-7.6\" = questao 18 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "img20-1",
        "type": "image",
        "url": "exhibits/q20-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b2",
        "type": "terminal",
        "content": "HQ-NGFW-1 # diagnose test application ipsmonitor 1\npid = 2044, engine count = 0 (+1)\n0 - pid:2074:2074 cfg:1 master:0 run:1"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "As an administrator you have created an IPS profile, but it is not performing as expected. While testing you got the output as shown in the exhibit What could be the possible reason of the diagnose output shown in the exhibit?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "There is a no firewall policy configured with an IPS security profile."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Administrator entered the command diagnose test application ipsmonitor 5."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "FortiGate entered into IPS fail open state."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Administrator entered the command diagnose test application ipsmonitor 99."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "IPS",
      "CLI",
      "Troubleshooting"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** `ipsmonitor 1` com engine count 0 significa que nenhum IPS engine está rodando, porque nenhuma policy usa o IPS.\n- ✅ A: o IPS profile não está aplicado em nenhuma policy.\n- ❌ B: a opção 5 só alterna o bypass.\n- ❌ C: em fail-open, os engines estão rodando, sobrecarregados.\n- ❌ D: a opção 99 reinicia os engines."
  },
  {
    "id": "q-21",
    "docNumber": 21,
    "origin": "questao 21 do documento \"NSE4_FGT_AD-7.6\" = questao 13 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "img21-1",
        "type": "image",
        "url": "exhibits/q21-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b2",
        "type": "terminal",
        "content": "date=2025-09-03 time=09:09:57 id=7545895911432388608 itime=\"2025-09-03 09:10:02\" euid=3 epid=3 dsteuid=3 dstepid=101 logflag=0 logver=706003401 type=\"utm\" subtype=\"app-ctrl\" level=\"warning\" action=\"block\" sessionid=510 policyid=1 srcip=10.0.11.50 dstip=54.146.230.62 srcport=53398 dstport=80 proto=6 logid=1059028705 service=\"HTTP\" eventtime=1756915797391471958 incidentserialno=116391982 direction=\"outgoing\" apprisk=\"elevated\" appid=30220 srcintfrole=\"undefined\" dstintfrole=\"undefined\" applist=\"default\" appcat=\"Video/Audio\" app=\"ABC.Com\" hostname=\"abc.go.com\" url=\"/favicon.ico\" eventtype=\"signature\" srcintf=\"port4\" dstintf=\"port2\" msg=\"Video/Audio: ABC.Com\" tz=\"-0700\" policytype=\"policy\" srccountry=\"Reserved\" dstcountry=\"United States\" poluuid=\"b11ac58c-791b-51e7-4600-12f829a689d9\" agent=\"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0\" httpmethod=\"GET\" referralurl=\"http://abc.go.com/\" devid=\"FGVM02TM24013423\" vd=\"root\" dtime=\"2025-09-03 09:09:57\" itime_t=1756915802 devname=\"HQ-NGFW-1\""
      },
      {
        "id": "b3",
        "type": "text",
        "content": "Which two ways can you view the log messages shown in the exhibit? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "By right clicking the implicit deny policy."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Using the FortiGate CLI command diagnose log test."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "By filtering by policy universally unique identifier (UUID) and application name in the log entry."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "In the Forward Traffic section."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "C",
      "D"
    ],
    "tags": [
      "Logs",
      "Application Control"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** o log de App Control com bloqueio aparece nos logs de tráfego e pode ser filtrado pelos campos do log.\n- ❌ A: policyid=1, ou seja, não é a implicit deny (0).\n- ❌ B: `diagnose log test` gera logs de teste e não serve para visualizar.\n- ✅ C: dá para filtrar pelo poluuid e pelo nome da aplicação.\n- ✅ D: o log aparece em Forward Traffic."
  },
  {
    "id": "q-22",
    "docNumber": 22,
    "origin": "22. Refer to the exhibit. questao 26 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibit: SD-WAN traffic logs table showing Application Name, Result, Policy ID 1 (DIA), Destination Interface, SD-WAN Quality and SD-WAN Rule Name (blank)",
        "url": "exhibits/q22-1.jpeg"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "The administrator configured SD-WAN rules and set the FortiGate traffic log page to display SD-WANspecific columns: SD-WAN Quality and SD-WAN Rule Name. FortiGate allows the traffic according to policy ID 1 placed at the top. This is the policy that allows SDWAN traffic. Despite these settings, the traffic logs do not show the name of the SD-WAN rule used to steer those traffic flows. What could be the reason?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "SD-WAN rule names do not appear immediately. The administrator must refresh the page."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "There is no application control profile applied to the firewall policy."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Destinations in the SD-WAN rules are configured for each application, but feature visibility is not enabled."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "FortiGate load balanced the traffic according to the implicit SD-WAN rule."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "D"
    ],
    "tags": [
      "SD-WAN",
      "Logs",
      "Troubleshooting"
    ],
    "warnings": [],
    "domain": "routing",
    "explanation": "**Conceito:** app sem regra SD-WAN e sem métricas no log = caiu na regra implícita (balanceamento entre os membros).\n- ❌ A: o log já gravado não muda ao atualizar a página.\n- ❌ B: o nome da aplicação aparece no log, então o App Control está ativo.\n- ❌ C: feature visibility é só GUI.\n- ✅ D: regra implícita fazendo load balancing."
  },
  {
    "id": "q-23",
    "docNumber": 23,
    "origin": "questao 23 do documento \"NSE4_FGT_AD-7.6\" = questao 42 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibits."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibits: Network diagram, VIP object configuration (External 100.65.0.200 -> Map to 10.0.11.50, Port Forwarding 443 -> 4443), Firewall policies",
        "url": "exhibits/q23-1.jpeg"
      },
      {
        "id": "img23-2",
        "type": "image",
        "url": "exhibits/q23-2.jpeg",
        "pending": false,
        "label": "Exhibit 2"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "A diagram of a FortiGate device connected to the network VIP object and firewall policy configurations are shown.\nThe WAN (port2) interface has the IP address 100.65.0.101/24.\nThe LAN (port4) interface has the IP address 10.0.11.254/24.\nIf the host 100.65.1.111 sends a TCP SYN packet on port 443 to 100.65.0.200. what will the source address, destination address, and destination port of the packet be at the time FortiGate forwards the packet to the destination?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "10.0.11.254, 100.65.0.200. and 443, respectively"
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "10.0.11.254, 10.0.15.50, and 4443. respectively"
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "100.65.1.111, 10.0.11.50, and 4443. respectively"
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "100.65.1.111, 10.0.11.50. and 443. respectively"
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "VIP",
      "DNAT",
      "Firewall Policy"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** o VIP faz DNAT (destino e porta). A origem não muda na entrada.\n- ❌ A: origem e destino errados.\n- ❌ B: a origem não vira o IP da LAN, e o IP de destino está errado.\n- ✅ C: 100.65.1.111 → 10.0.11.50:4443.\n- ❌ D: ignora o port forwarding 443→4443."
  },
  {
    "id": "q-24",
    "docNumber": 24,
    "origin": "questao 24 do documento \"NSE4_FGT_AD-7.6\" = questao 7 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "A network administrator is reviewing firewall policies in both Interface Pair View and By Sequence View. The policies appear in a different order in each view. Why is the policy order different in these two views?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "By Sequence View groups policies based on rule priority, while Interface Pair View always follows the order of traffic logs."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The firewall dynamically reorders policies in Interface Pair View based on recent traffic patterns, but By Sequence View remains static."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Interface Pair View sorts policies based on matching interfaces, while By Sequence View shows the actual processing order of rules."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Policies in Interface Pair View are prioritized by security levels, while By Sequence View strictly follows the administrator's manual ordering."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "Firewall Policy",
      "GUI"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** a Interface Pair View agrupa por par de interfaces. A By Sequence mostra a ordem real de processamento.\n- ❌ A: inverte as duas visões, e logs não definem a ordem.\n- ❌ B: o FortiGate não reordena policies sozinho.\n- ✅ C: descrição correta das duas visões.\n- ❌ D: não existe \"security level\" de interface no FortiOS."
  },
  {
    "id": "q-25",
    "docNumber": 25,
    "origin": "questao 25 do documento \"NSE4_FGT_AD-7.6\" = questao 31 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "A new administrator is configuring FSSO authentication on FortiGate using DC Agent Mode. Which step is not part of the expected process?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The DC agent sends login event data directly to FortiGate."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "FortiGate determines user identity based on the IP address in the FSSO list."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The collector agent forwards login event data to FortiGate."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The user logs into the windows domain."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "FSSO",
      "Authentication"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** fluxo do FSSO: login no domínio → DC agent → collector (UDP 8002) → FortiGate (TCP 8000) → identificação pelo IP.\n- ✅ A (falso, logo é a resposta): o DC agent manda para o collector, não para o FortiGate.\n- ❌ B: faz parte; o FortiGate identifica o usuário pelo IP.\n- ❌ C: faz parte; o collector envia ao FortiGate.\n- ❌ D: faz parte; é o gatilho."
  },
  {
    "id": "q-26",
    "docNumber": 26,
    "origin": "questao 26 do documento \"NSE4_FGT_AD-7.6\" = questao 46 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Which statement correctly describes NetAPI polling mode for the FSSO collector agent?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The collector agent uses a Windows API to query DCs for user logins."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The NetSessionEnum function is used to track user logouts."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "NetAPI polling can increase bandwidth usage in large networks."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The collector agent must search Windows application event logs."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "B"
    ],
    "tags": [
      "FSSO",
      "NetAPI"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** o NetAPI usa a NetSessionEnum para ler sessões de login e logout. É rápido, mas pode perder eventos.\n- ❌ A: \"Windows API consultando o DC\" é a descrição do WMI.\n- ✅ B: a NetSessionEnum rastreia as sessões.\n- ❌ C: banda e rede grande são questões do WinSecLog e do WMI.\n- ❌ D: ler logs é o WinSecLog, e são logs de segurança."
  },
  {
    "id": "q-27",
    "docNumber": 27,
    "origin": "questao 27 do documento \"NSE4_FGT_AD-7.6\" = questao 22 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "img27-1",
        "type": "image",
        "url": "exhibits/q27-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "img27-2",
        "type": "image",
        "url": "exhibits/q27-2.jpeg",
        "pending": false,
        "label": "Exhibit 2"
      },
      {
        "id": "b2",
        "type": "terminal",
        "content": "HA configuration:\nHQ-NGFW-1 # config system ha\nHQ-NGFW-1 (ha) # show\nconfig system ha\n    set group-id 5\n    set group-name \"Training\"\n    set mode a-p\n    set password ENC a4fbyqY4iPexFmAnZgzDY\n    set hbdev \"port7\" 0\n    set session-pickup enable\n    set override disable\n    set priority 200\n    set monitor \"port1\"\n    set memory-based-failover enable\n    set memory-failover-threshold 70\n    set memory-failover-monitor-period 50\n    set memory-failover-sample-rate 10\n    set memory-failover-flip-timeout 60\nend\n\nHQ-NGFW-1 System Performance output:\nMemory: 2042076k total, 1837868k used (90%), 104146k free (5.1%), 100062k freeable (4.9%)\n\nHQ-NGFW-2 System Performance output:\nMemory: 2042076k total, 993836k used (48.7%), 690352k free (33.8%), 357888k freeable (17.5%)"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "An administrator has observed HA cluster performance status for 55 seconds. Which FortiGate is the primary?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "HQ-NGFW-1 with the parameter memory-failover-flip-timeout setting."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "HQ-NGFW-2 with the parameter priority setting."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "HQ-NGFW-1 with the parameter override setting."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "HQ-NGFW-2 with the parameter memory-failover-threshold setting."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "D"
    ],
    "tags": [
      "HA",
      "FGCP",
      "Failover"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** o memory failover dispara quando a memória passa do threshold por mais tempo que o monitor period.\n- ❌ A: o flip-timeout só evita novo failover por um período.\n- ❌ B: a priority favorece o NGFW-1.\n- ❌ C: override disable não impede o memory failover.\n- ✅ D: o NGFW-1 ficou acima de 70% por 55 s (o período é 50 s), e o NGFW-2 assumiu."
  },
  {
    "id": "q-28",
    "docNumber": 28,
    "origin": "28. Refer to the exhibit. A partial cloud topology is shown.",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit. A partial cloud topology is shown."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibit: AWS Region topology showing FortiGate CNF Instance, GWLB, GWLBe in Customer VPC, EC2, Internet Gateway",
        "url": "exhibits/q28-1.jpeg"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "You deployed a FortiGate Cloud-Native Firewall (CNF) in AWS. During the deployment, which components must the FortiGate CNF create to handle traffic from the EC2 instance?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The customer VPC and GWLBe."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The gateway load balancer endpoint (GWLBe) in the customer virtual private cloud (VPC)."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The CNF VPC. customer VPC. and GWLB."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The GWLB. GWLBe, and the internet gateway (IGW) in the customer VPC."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "B"
    ],
    "tags": [
      "Cloud",
      "AWS",
      "FortiGate CNF"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** o CNF só cria o GWLBe na VPC do cliente. O resto é infraestrutura da Fortinet ou já existe.\n- ❌ A: a VPC do cliente já existe.\n- ✅ B: só o GWLBe.\n- ❌ C: VPC do CNF e GWLB são da Fortinet, e falta o GWLBe.\n- ❌ D: o GWLB fica do lado do CNF, e o IGW já existe."
  },
  {
    "id": "q-29",
    "docNumber": 29,
    "origin": "questao 29 do documento \"NSE4_FGT_AD-7.6\" = questao 45 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "image",
        "pending": false,
        "label": "Exhibit: Application and Filter Overrides (Priority 1: Details ABC.Com, Type Application, Action Allow; Priority 2: Excessive-Bandwidth, Type Filter, Action Block)",
        "url": "exhibits/q29-1.jpeg"
      },
      {
        "id": "b2",
        "type": "text",
        "content": "An administrator has configured an Application Overrides for the ABC.Com application signature and set the Action to Allow This application control profile is then applied to a firewall policy that is scanning all outbound traffic. Logging is enabled in the firewall policy. To test the configuration, the administrator accessed the ABC.Com web site several times. Why are there no logs generated under security logs for ABC.Com?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The ABC Com is hitting the category Excessive-Bandwidth."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The ABC.Com is configured under application profile, which must be configured as a web filter profile."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The ABC.Com Type is set as Application instead of Filter."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The ABC.Com Action is set to Allow."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "D"
    ],
    "tags": [
      "Application Control",
      "Logging"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** no App Control, Allow passa **sem log** e Monitor passa **com log**.\n- ❌ A: o override ABC.Com (prioridade 1) casa antes do Excessive-Bandwidth.\n- ❌ B: App Control é profile próprio, não web filter.\n- ❌ C: Application é o tipo certo para uma assinatura específica.\n- ✅ D: a action Allow não gera log."
  },
  {
    "id": "q-30",
    "docNumber": 30,
    "origin": "questao 30 do documento \"NSE4_FGT_AD-7.6\" = questao 19 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "img30-1",
        "type": "image",
        "url": "exhibits/q30-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b1",
        "type": "terminal",
        "content": "System Performance output:\nMemory: 2042076k total, 1837868k used (90%), 104146k free (5.1%), 100062k freeable (4.9%)\n\nMemory usage threshold settings:\nconfig system global\n    set memory-use-threshold-extreme 89\n    set memory-use-threshold-green 82\n    set memory-use-threshold-red 88\nend"
      },
      {
        "id": "b2",
        "type": "text",
        "content": "The system performance output and default configuration of high memory usage thresholds on a FortiGate device are shown. Based on the system performance output, what are the two possible outcomes? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Administrators can access only through the console port."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "FortiGate has entered conserve mode."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "FortiGate drops new sessions."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Administrators can change the configuration."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "B",
      "C"
    ],
    "tags": [
      "Conserve Mode",
      "CLI",
      "System Performance"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** thresholds de memória: acima do red, entra em conserve mode; acima do extreme, descarta novas sessões.\n- ❌ A: não existe regra de \"só console\".\n- ✅ B: 90% > red (88%), então está em conserve mode.\n- ✅ C: 90% > extreme (89%), então descarta novas sessões.\n- ❌ D: em conserve mode não dá para mudar a configuração."
  },
  {
    "id": "q-31",
    "docNumber": 31,
    "origin": "questao 31 do documento \"NSE4_FGT_AD-7.6\" = questao 48 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "An administrator wanted to configure an IPS sensor to block traffic that triggers the signature set number of times during a specific time period. How can the administrator achieve the objective?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Use IPS group signatures, set rate-mode 60."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Use IPS packet logging option with periodical filter option."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Use IPS signatures, rate-mode periodical option."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Use IPS filter, rate-mode periodical option."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "IPS",
      "Rate-based"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** rate-based settings (count, duration, periodical) só existem em **IPS signatures** individuais.\n- ❌ A: \"group signatures\" não existe, e o 60 seria o rate-duration.\n- ❌ B: packet logging só guarda cópia do pacote.\n- ✅ C: signature + rate-mode periodical.\n- ❌ D: filtros não têm rate-based settings."
  },
  {
    "id": "q-32",
    "docNumber": 32,
    "origin": "questao 32 do documento \"NSE4_FGT_AD-7.6\" = questao 24 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Which two components are part of the secure internet access (SIA) agent-based mode on FortiSASE? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "FortiSASE Firewall-as-a-Service (FWaaS)."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The proxy auto-configuration (PAC) file."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "VPN policies."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "FortiExtender."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "C"
    ],
    "tags": [
      "FortiSASE",
      "SIA"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** no FortiSASE agent-based, o FortiClient faz túnel VPN, protegido por FWaaS e VPN policies.\n- ✅ A: FWaaS.\n- ❌ B: PAC é do modo agentless.\n- ✅ C: VPN policies.\n- ❌ D: FortiExtender é LAN extension (filial)."
  },
  {
    "id": "q-33",
    "docNumber": 33,
    "origin": "questao 33 do documento \"NSE4_FGT_AD-7.6\" = questao 10 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "image",
        "pending": false,
        "label": "Exhibits: Application sensor (Overrides: Excessive-Bandwidth Block, Google Monitor) and Firewall policy (Flow-based, deep-inspection, Log allowed traffic All sessions)",
        "url": "exhibits/q33-1.jpeg"
      },
      {
        "id": "b2",
        "type": "text",
        "content": "Refer to the application sensor and firewall policy exhibits. Which two factors can you observe? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "YouTube access is blocked based on Excessive-Bandwidth Application and Filter override settings."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Facebook access is blocked based on the category filter settings."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Facebook access is allowed but you cannot play Facebook videos based on Video/Audio category filter settings."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "YouTube search is allowed based on the Google Application and Filter override settings."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "B",
      "D"
    ],
    "tags": [
      "Application Control",
      "Firewall Policy"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** overrides vêm antes das categorias. Assinaturas sem override caem na categoria.\n- ❌ A: só bloqueia as assinaturas do YouTube com Excessive-Bandwidth, não o YouTube inteiro.\n- ✅ B: o Facebook cai na categoria Social Media, que está em Block.\n- ❌ C: o Facebook nem é permitido.\n- ✅ D: a busca do YouTube casa com Google→Monitor e passa."
  },
  {
    "id": "q-34",
    "docNumber": 34,
    "origin": "questao 34 do documento \"NSE4_FGT_AD-7.6\" = questao 3 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Which three statements about SD-WAN performance SLAs are true? (Choose three.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "They rely on session loss and jitter."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "They monitor the state of the FortiGate device."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "All the SLA targets can be configured."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "They can be measured actively or passively."
      },
      {
        "id": "opt-E",
        "letter": "E",
        "text": "They are applied in a SD-WAN rule lowest cost strategy."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 3,
    "correctAnswers": [
      "C",
      "D",
      "E"
    ],
    "tags": [
      "SD-WAN",
      "Performance SLA"
    ],
    "warnings": [],
    "domain": "routing",
    "explanation": "**Conceito:** o Performance SLA mede latência, jitter e packet loss de cada membro.\n- ❌ A: a métrica é packet loss, não session loss.\n- ❌ B: monitora os membros (links), não o FortiGate.\n- ✅ C: todos os SLA targets são configuráveis.\n- ✅ D: a medição pode ser ativa ou passiva.\n- ✅ E: o SLA é usado na estratégia Lowest Cost (SLA)."
  },
  {
    "id": "q-35",
    "docNumber": 35,
    "origin": "questao 35 do documento \"NSE4_FGT_AD-7.6\" = questao 32 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "image",
        "pending": false,
        "label": "Exhibit: Profile Name table showing Monitoring_Access, NOC_Access, prof_admin, super_admin",
        "url": "exhibits/q35-1.jpeg"
      },
      {
        "id": "b2",
        "type": "text",
        "content": "The NOC team connects to the FortiGate GUI with the NOC_Access admin profile. They request that their GUI sessions do not disconnect too early during inactivity. What must the administrator configure to answer this specific request from the NOC team?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Increase the admintimeout value under config system accprofile noc Access."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "increase the offline value of the override idle Timeout parameter in the NOC_Access admin profile."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Move NOC_Access to the top of the list to ensure all profile settings take effect."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Ensure that all NOC_Access users are assigned the super_admin role to guarantee access."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "Administrator",
      "Profile",
      "GUI"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** um admin profile pode sobrescrever o idle timeout global (override + `admintimeout`).\n- ✅ A: aumentar o `admintimeout` no accprofile NOC_Access.\n- ❌ B: não existe parâmetro \"offline\".\n- ❌ C: admin profiles não têm ordem.\n- ❌ D: viola o menor privilégio e não resolve o timeout."
  },
  {
    "id": "q-36",
    "docNumber": 36,
    "origin": "questao 36 do documento \"NSE4_FGT_AD-7.6\" = questao 1 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "The FortiGate device HQ-NGFW-1 with the IP address 10.0.13.254 sends logs to the FortiAnalyzer device with the IP address 10.0.13.125. The administrator wants to verify that reliable logging is enabled on HQ-NGFW-1. Which exhibit helps with the verification?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Saída do `diagnose sniffer packet`",
        "image": "exhibits/q36-1.png"
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "`config log fortianalyzer setting`",
        "image": "exhibits/q36-2.jpeg"
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Tela do FortiAnalyzer, Logging Mode Real Time",
        "image": "exhibits/q36-3.jpeg"
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Tela do FortiAnalyzer, Real Time com cadeado",
        "image": "exhibits/q36-4.jpeg"
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "FortiAnalyzer",
      "Logging",
      "CLI"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** reliable logging = TCP 514. Só o sniffer mostra o transporte.\n- ✅ A: o sniffer mostra TCP com ACK na porta 514.\n- ❌ B: a config não tem `set reliable enable`.\n- ❌ C: \"Real Time\" é **quando** os logs são enviados, não o protocolo.\n- ❌ D: a tela com cadeado também não mostra o transporte.",
    "kind": "image-choice"
  },
  {
    "id": "q-37",
    "docNumber": 37,
    "origin": "questao 37 do documento \"NSE4_FGT_AD-7.6\" = questao 11 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "image",
        "pending": false,
        "label": "Exhibit: Exempt from SSL Inspection (Reputable websites, Web categories: Finance and Banking, Health and Wellness; Addresses: adobe, android, apple, appstore)",
        "url": "exhibits/q37-1.jpeg"
      },
      {
        "id": "b2",
        "type": "text",
        "content": "The predefined deep-inspection and custom-deep-inspection profiles exclude some web categories from SSL inspection, as shown in the exhibit For which two reasons are these web categories exempted? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The resources utilization is optimized because these websites are in the trusted domain list on FortiGate."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The legal regulation aims to prioritize user privacy and protect sensitive information for these websites."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "These websites are in an allowlist of reputable domain names maintained by FortiGuard."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The FortiGate temporary certificate denies the browser's access to websites that use HTTP Strict Transport Security."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "B",
      "D"
    ],
    "tags": [
      "SSL Inspection",
      "Certificate"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** categorias como Finance e Health são isentas de deep inspection por privacidade (lei) e por HSTS.\n- ❌ A: não existe \"trusted domain list\" com esse motivo.\n- ✅ B: privacidade e regulação legal.\n- ❌ C: a allowlist Reputable websites existe, mas está desligada no exhibit.\n- ✅ D: sites com HSTS recusam o certificado temporário."
  },
  {
    "id": "q-38",
    "docNumber": 38,
    "origin": "questao 38 do documento \"NSE4_FGT_AD-7.6\" = questao 43 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "image",
        "pending": false,
        "label": "Exhibit: New AntiVirus Profile (Name: FTP_AV_Profile, AntiVirus scan toggle grayed out, Feature set Flow-based, Inspected Protocols all off)",
        "url": "exhibits/q38-1.jpeg"
      },
      {
        "id": "b2",
        "type": "text",
        "content": "Why is the Antivirus scan switch grayed out when creating a new antivirus profile for FTP?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Antivirus scan is disabled under System -> Feature visibility."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "None of the inspected protocols are active in this profile."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The Feature Set for the profile is Flow-based but it must be Proxy-based."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "FortiGate with less than 2 GB RAM. does not support the Antivirus scan feature."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "B"
    ],
    "tags": [
      "Antivirus",
      "Profile",
      "GUI"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** o switch de AV scan só fica ativo com pelo menos um protocolo inspecionado ligado.\n- ❌ A: feature visibility esconderia o AV inteiro.\n- ✅ B: nenhum protocolo está ativo no profile.\n- ❌ C: flow-based suporta AV.\n- ❌ D: não é limitação de RAM."
  },
  {
    "id": "q-39",
    "docNumber": 39,
    "origin": "questao 39 do documento \"NSE4_FGT_AD-7.6\" = questao 16 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "FortiGate is integrated with FortiAnalyzer and FortiManager. When creating a firewall policy, which attribute must an administrator include to enhance functionality and enable log recording on FortiAnalyzer and FortiManager?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Universally Unique Identifier."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Policy ID."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Sequence ID."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Log ID."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "FortiAnalyzer",
      "FortiManager",
      "Firewall Policy"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** o UUID identifica a policy de forma única nos logs e na integração com FortiManager e FortiAnalyzer.\n- ✅ A: UUID.\n- ❌ B: o Policy ID é local e não é único entre equipamentos.\n- ❌ C: a sequência é a ordem de avaliação.\n- ❌ D: o Log ID é o tipo de mensagem de log."
  },
  {
    "id": "q-40",
    "docNumber": 40,
    "origin": "questao 40 do documento \"NSE4_FGT_AD-7.6\" = questao 34 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "How does FortiExtender connect to FortiSASE in a site-based, remote internet access method?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "FortiExtender establishes a secure SSL connection using FortiClient."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "FortiExtender uses the proxy auto-configuration."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "FortiExtender first connects to a FortiGate LAN extension through a secure web gateway (SWG)."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "FortiExtender uses a Virtual Extensible LAN (VXLAN)-over-IPsec connection."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "D"
    ],
    "tags": [
      "FortiExtender",
      "FortiSASE"
    ],
    "warnings": [],
    "domain": "vpn",
    "explanation": "**Conceito:** o FortiExtender (LAN extension) conecta ao FortiSASE por VXLAN sobre IPsec.\n- ❌ A: FortiClient é do agent-based.\n- ❌ B: PAC é do agentless.\n- ❌ C: o FortiExtender conecta direto ao FortiSASE.\n- ✅ D: VXLAN-over-IPsec."
  },
  {
    "id": "q-41",
    "docNumber": 41,
    "origin": "questao 41 do documento \"NSE4_FGT_AD-7.6\" = questao 30 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "What are two features of collector agent advanced mode? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "In advanced mode, security profiles can be applied only to user groups, not individual users."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "In advanced mode. FortiGate can be configured as an LDAP client and group filters can be configured on FortiGate."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Advanced mode uses the Windows convention—NetBios: Domain\\Username."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Advanced mode supports nested or inherited groups."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "B",
      "D"
    ],
    "tags": [
      "FSSO",
      "Collector Agent"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** o modo Advanced do FSSO usa LDAP: filtros de grupo no FortiGate, grupos aninhados e convenção LDAP.\n- ❌ A: essa é a limitação do modo Standard.\n- ✅ B: FortiGate como cliente LDAP, com group filters.\n- ❌ C: a convenção Domain\\User é do Standard.\n- ✅ D: suporta grupos aninhados."
  },
  {
    "id": "q-42",
    "docNumber": 42,
    "origin": "questao 42 do documento \"NSE4_FGT_AD-7.6\" = questao 15 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "img42-1",
        "type": "image",
        "url": "exhibits/q42-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b1",
        "type": "text",
        "content": "You have configured the below commands on a FortiGate"
      },
      {
        "id": "b2",
        "type": "terminal",
        "content": "config system settings\n    set strict-src-check enable\nend\n\nconfig system interface\n    edit port1\n        set src-check disable\n    next\nend"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "What would be the impact of this configuration on FortiGate?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "FortiGate will enable strict RPF on all its interfaces and porti will be enable for asymmetric routing."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Port1 will be enabled with flexible RPF. and all other interfaces will be enabled for strict RPF."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "FortiGate will enable strict RPF on all its interfaces and port1 will be exempted from RPF checks."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The global configuration will take precedence and FortiGate will enable strict RPF on all interfaces."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "RPF",
      "CLI",
      "Routing"
    ],
    "warnings": [],
    "domain": "routing",
    "explanation": "**Conceito:** o RPF strict global vale para todas as interfaces, e `src-check disable` tira uma interface da checagem.\n- ❌ A: desligar o RPF não é \"habilitar roteamento assimétrico\".\n- ❌ B: a port1 fica sem checagem, não em modo flexível.\n- ✅ C: strict em todas, e a port1 isenta.\n- ❌ D: a config da interface não é sobrescrita pela global."
  },
  {
    "id": "q-43",
    "docNumber": 43,
    "origin": "questao 43 do documento \"NSE4_FGT_AD-7.6\" = questao 23 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "img43-1",
        "type": "image",
        "url": "exhibits/q43-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b1",
        "type": "text",
        "content": "A routing table is shown."
      },
      {
        "id": "b2",
        "type": "terminal",
        "content": "Routing Table:\n10.0.11.0/24   0.0.0.0         port4    Distance 0  Metric 0  Priority 0  Connected\n10.0.12.0/24   0.0.0.0         port5    Distance 0  Metric 0  Priority 0  Connected\n10.0.13.0/24   0.0.0.0         port6    Distance 0  Metric 0  Priority 0  Connected\n100.65.0.0/24  0.0.0.0         port2    Distance 0  Metric 0  Priority 0  Connected\n100.66.0.0/24  0.0.0.0         port3    Distance 0  Metric 0  Priority 0  Connected\n172.20.1.0/24  100.66.0.254    port3    Distance 9  Metric 0  Priority 2  Static\n192.168.0.0/16 0.0.0.0         port1    Distance 0  Metric 0  Priority 0  Connected"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "An administrator wants to create a new static route so the traffic to the subnet 172.20.1.0/24 is routed through port2 only. What are the two criteria that the administrator can use to achieve this objective? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The new static route must have the priority set to 3."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The new static route must have the metric set to 1."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The existing static route through port3 must have the distance set to 11."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The new static route must have the distance set to 9."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "C",
      "D"
    ],
    "tags": [
      "Routing",
      "Static Route"
    ],
    "warnings": [],
    "domain": "routing",
    "explanation": "**Conceito:** em rotas estáticas, vence a menor distance. Com distance empatada, vence a menor priority.\n- ❌ A: a distance já perde, e priority 3 seria pior.\n- ❌ B: metric não decide entre rotas estáticas.\n- ✅ C: com a antiga em distance 11, a nova (10) vence.\n- ✅ D: distance 9 empata, e a priority 1 vence a 2."
  },
  {
    "id": "q-44",
    "docNumber": 44,
    "origin": "questao 44 do documento \"NSE4_FGT_AD-7.6\" = questao 49 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "There are multiple dialup IPsec VPNs configured in aggressive mode on the HQ FortiGate. The requirement is to connect dial-up users to their respective department VPN tunnels.\nWhich phase 1 setting you can configure to match the user to the tunnel?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Local Gateway."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Dead Peer Detection."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Peer ID."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "IKE Mode Config."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "IPsec",
      "VPN",
      "Phase 1"
    ],
    "warnings": [],
    "domain": "vpn",
    "explanation": "**Conceito:** vários dial-ups no mesmo IP são separados pelo Peer ID (aggressive mode).\n- ❌ A: Local Gateway é o IP local do túnel.\n- ❌ B: DPD detecta peer morto.\n- ✅ C: Peer ID.\n- ❌ D: Mode Config entrega IP, DNS e rotas depois que o túnel sobe."
  },
  {
    "id": "q-45",
    "docNumber": 45,
    "origin": "questao 45 do documento \"NSE4_FGT_AD-7.6\" = questao 5 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "A network administrator has enabled full SSL inspection and web filtering on FortiGate. When visiting any HTTPS websites, the browser reports certificate warning errors. When visiting HTTP websites, the browser does not report errors.\nWhat is the reason for the certificate warning errors?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The option invalid SSL certificates is set to allow on the SSL/SSH inspection profile."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The matching firewall policy is set to proxy inspection mode."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The browser does not trust the certificate used by FortiGate for SSL inspection."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The certificate used by FortiGate for SSL inspection does not contain the required certificate extensions."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "SSL Inspection",
      "Certificate"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** na full SSL inspection, o navegador precisa confiar na CA do FortiGate (Fortinet_CA_SSL).\n- ❌ A: Allow só afeta sites com certificado inválido.\n- ❌ B: o modo proxy ou flow não muda o certificado.\n- ✅ C: o navegador não confia na CA do FortiGate.\n- ❌ D: o certificado tem as extensões; o problema é a confiança."
  },
  {
    "id": "q-46",
    "docNumber": 46,
    "origin": "questao 46 do documento \"NSE4_FGT_AD-7.6\" = questao 17 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "You have configured an application control profile, set peer-to-peer traffic to Block under the Categories tab. and applied it to the firewall policy. However, your peer-to-peer traffic on known ports is passing through the FortiGate without being blocked.\nWhat FortiGate settings should you check to resolve this issue?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "FortiGuard category ratings."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Network Protocol Enforcement."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Replacement Messages for UDP-based Applications."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Application and Filter Overrides."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "D"
    ],
    "tags": [
      "Application Control",
      "P2P"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** overrides são avaliados antes das categorias. Um override em Allow ou Monitor anula o Block da categoria.\n- ❌ A: FortiGuard category rating é do Web Filter.\n- ❌ B: Network Protocol Enforcement controla serviço por porta.\n- ❌ C: replacement message é só a página de bloqueio.\n- ✅ D: Application and Filter Overrides."
  },
  {
    "id": "q-47",
    "docNumber": 47,
    "origin": "questao 47 do documento \"NSE4_FGT_AD-7.6\" = questao 20 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "What are two characteristics of HA cluster heartbeat IP addresses in a FortiGate device? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Heartbeat IP addresses are used to distinguish between cluster members."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The heartbeat interface of the primary device in the cluster is always assigned IP address 169.254.0.1."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "A change in the heartbeat IP address happens when a FortiGate device joins or leaves the cluster."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Heartbeat interfaces have virtual IP addresses that are manually assigned."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "C"
    ],
    "tags": [
      "HA",
      "Heartbeat",
      "FGCP"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** os IPs de heartbeat (169.254.0.x) são automáticos, pela ordem do número de série, e refeitos quando o cluster muda.\n- ✅ A: distinguem os membros.\n- ❌ B: o .1 vai para o maior serial, não para o primary.\n- ✅ C: mudam quando um membro entra ou sai.\n- ❌ D: não são atribuídos manualmente."
  },
  {
    "id": "q-48",
    "docNumber": 48,
    "origin": "questao 48 do documento \"NSE4_FGT_AD-7.6\" = questao 2 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "terminal",
        "content": "Routing Table:\nDestination       Gateway IP      Interface   Status\n0.0.0.0/0         100.65.0.254    port2       Enabled\n10.10.10.0/24     100.66.0.254    port3       Enabled\n10.0.13.0/24      10.0.13.125     port6       Enabled"
      },
      {
        "id": "b2",
        "type": "text",
        "content": "Based on the routing table shown in the exhibit, which two statements are true? (Choose two.)"
      },
      {
        "id": "img48-1",
        "type": "image",
        "url": "exhibits/q48-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "A packet with the source IP address 10.0.13.10 arriving on port2 is allowed if strict RPF is disabled."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "A packet with the source IP address 10.100.110.10 arriving on port2 is allowed if strict RPF is enabled."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "A packet with the source IP address 10.100.110.10 arriving on port3 is allowed if strict RPF is disabled."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "A packet with the source IP address 10.10.10.10 arriving on port2 is allowed if strict RPF is enabled."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "B"
    ],
    "tags": [
      "RPF",
      "Routing"
    ],
    "warnings": [],
    "domain": "routing",
    "explanation": "**Conceito:** RPF strict exige que a melhor rota para a origem saia pela interface de entrada. Feasible aceita qualquer rota válida.\n- ✅ A: em feasible, a default pela port2 cobre 10.0.13.10.\n- ✅ B: a única rota para 10.100.110.10 é a default pela port2.\n- ❌ C: nenhuma rota pela port3 cobre 10.100.110.10.\n- ❌ D: a melhor rota para 10.10.10.10 é pela port3."
  },
  {
    "id": "q-49",
    "docNumber": 49,
    "origin": "questao 49 do documento \"NSE4_FGT_AD-7.6\" = questao 4 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "FortiGate is operating in NAT mode and has two physical interfaces connected to the LAN and DMZ networks respectively. Which two statements about the requirements of connected physical interfaces on FortiGate are true? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Both interfaces must have DHCP enabled and interfaces set to LAN and DMZ roles assigned."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Both interfaces must have the interface role assigned."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Both interfaces must have directly connected routes on the routing table."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Both interfaces must have IP addresses assigned."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "C",
      "D"
    ],
    "tags": [
      "Interfaces",
      "NAT Mode"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** em NAT mode, uma interface conectada precisa de IP e gera rota conectada.\n- ❌ A: DHCP e roles não são obrigatórios.\n- ❌ B: o role é opcional.\n- ✅ C: precisa de rota conectada.\n- ✅ D: precisa de IP."
  },
  {
    "id": "q-50",
    "docNumber": 50,
    "origin": "questao 50 do documento \"NSE4_FGT_AD-7.6\" = questao 28 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "image",
        "pending": false,
        "label": "Exhibits: Web filter profile (Static URL Filter: www.facebook.com Simple Monitor Enable), Firewall policy (Inspection mode Flow-based), FortiGuard Web Page Blocked (Malicious Websites)",
        "url": "exhibits/q50-1.jpeg"
      },
      {
        "id": "b2",
        "type": "text",
        "content": "A web filter profile configuration and firewall policy configuration are shown. You are trying to access www.facebook.com, but you are redirected to a FortiGuard web filtering block page. Based on the exhibits, what is the possible cause of the issue?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The web rating override configuration is incorrect."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The web filter profile feature set is configured incorrectly."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The firewall policy inspection mode is incorrect."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "For www.facebook.com the URL filter action is incorrect."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "Web Filter",
      "Firewall Policy"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** o facebook.com bloqueado como \"Malicious Websites\" indica um rating override local errado.\n- ✅ A: o rating override está incorreto.\n- ❌ B: feature set errado faria o profile não aparecer.\n- ❌ C: o inspection mode não muda a categoria.\n- ❌ D: Monitor no URL filter funciona como deveria."
  },
  {
    "id": "q-51",
    "docNumber": 51,
    "origin": "questao 51 do documento \"NSE4_FGT_AD-7.6\" = questao 65 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Exhibit"
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibits: Application sensor configuration (Overrides Priority 1: Excessive-Bandwidth Block, Priority 2: Apple Monitor) and FaceTime details",
        "url": "exhibits/q51-1.jpeg"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "The exhibits show the application sensor configuration and the Excessive-Bandwidth and Apple filter details. Based on the configuration, what will happen to Apple FaceTime if there are only a few calls originating or incoming? (Choose one answer)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Apple FaceTime will be allowed, based on the Video/Audio category configuration."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Apple FaceTime will be blocked, based on the Excessive-Bandwidth filter configuration."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Apple FaceTime will be allowed, based on the Apple filter configuration."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Apple FaceTime will be allowed only if the Apple filter in Application and Filter Overrides is set to Allow."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "B"
    ],
    "tags": [
      "Application Control",
      "Overrides"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** o primeiro override que casa decide. O Excessive-Bandwidth (prioridade 1) casa com o FaceTime.\n- ❌ A: a categoria do FaceTime é VoIP, e Video/Audio está em Block.\n- ✅ B: bloqueado pelo Excessive-Bandwidth.\n- ❌ C: o filtro Apple está em prioridade 2.\n- ❌ D: o problema é a posição, não a ação."
  },
  {
    "id": "q-52",
    "docNumber": 52,
    "origin": "questao 52 do documento \"NSE4_FGT_AD-7.6\" = questao 54 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Which two statements are true about an HA cluster? (Choose two answers)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "An HA cluster cannot have both in-band and out-of-band management interfaces at the same time."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Link failover triggers a failover if the administrator sets the interface down on the primary device."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "When sniffing the heartbeat interface, the administrator must see the IP address 169.254.0.2."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "HA incremental synchronization includes FIB entries and IPsec SAs."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "B",
      "D"
    ],
    "tags": [
      "HA",
      "FGCP"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** link failover = interface monitorada cai no primary. A sync incremental inclui FIB e SAs IPsec.\n- ❌ A: in-band e out-of-band podem coexistir.\n- ✅ B: interface monitorada down dispara failover.\n- ❌ C: o hello é de camada 2, e o IP não é fixo.\n- ✅ D: a sync incremental inclui FIB e SAs IPsec."
  },
  {
    "id": "q-53",
    "docNumber": 53,
    "origin": "53.",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Which two statements describe characteristics of automation stitches? (Choose two answers)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Actions involve only devices included in the Security Fabric."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "An automation stitch can have multiple triggers."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Multiple actions can run in parallel."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Triggers can involve external connectors."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "C",
      "D"
    ],
    "tags": [
      "Automation Stitches",
      "Security Fabric"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** um automation stitch tem 1 trigger e N ações (paralelas ou sequenciais), e pode usar conectores externos.\n- ❌ A: as ações podem chamar serviços externos.\n- ❌ B: é um trigger por stitch.\n- ✅ C: as ações podem rodar em paralelo.\n- ✅ D: triggers podem vir de conectores externos."
  },
  {
    "id": "q-54",
    "docNumber": 54,
    "origin": "questao 54 do documento \"NSE4_FGT_AD-7.6\" = questao 55 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Which three strategies are valid SD-WAN rule strategies for member selection? (Choose three answers)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Lowest Cost (SLA) without load balancing."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Manual with load balancing."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Lowest Quality (SLA) with load balancing."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Lowest Cost (SLA) with load balancing."
      },
      {
        "id": "opt-E",
        "letter": "E",
        "text": "Best Quality with load balancing."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 3,
    "correctAnswers": [
      "A",
      "B",
      "D"
    ],
    "tags": [
      "SD-WAN",
      "Strategies"
    ],
    "warnings": [],
    "domain": "routing",
    "explanation": "**Conceito:** load balancing nas SD-WAN rules: aceito em Manual e Lowest Cost (SLA), não em Best Quality.\n- ✅ A: Lowest Cost sem LB.\n- ✅ B: Manual com LB.\n- ❌ C: \"Lowest Quality\" não existe.\n- ✅ D: Lowest Cost com LB.\n- ❌ E: Best Quality escolhe um único membro."
  },
  {
    "id": "q-55",
    "docNumber": 55,
    "origin": "55. Refer to the exhibit showing a debug flow output.",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit showing a debug flow output."
      },
      {
        "id": "img55-1",
        "type": "image",
        "url": "exhibits/q55-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b2",
        "type": "terminal",
        "content": "Debug Flow output:\nvd-root:0 received a packet(proto=1, 10.0.11.50:3->100.65.0.254:2048) tun_id=0.0.0.0 from port4. type=8, code=0, id=3, seq=5.\nallocate a new session-00000721\nin-[port4], out-[]\nlen=0\nresult: skb_flags-02000000, vid-0, ret-no-match, act-accept, flag-00000000\nfind a route: flag=00000000 gw-0.0.0.0 via port2\nin-[port4], out-[port2], skb_flags-02000000, vid-0, app_id: 0, url_cat_id: 0\ngnum-100004, use addr/intf hash, len=3\nchecked gnum-100004 policy-2, ret-matched, act-accept\nret-matched\ngnum-4e20, check-fffffffa002c9c7\nchecked gnum-4e20 check, result: ret-no-match, act-drop\npolicy-2 is matched, act-drop\nafter iprope_captive_check(): is_captive=0, ret-matched, act-drop, idx-2\nDenied by forward policy check (policy 2)"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "Which two conclusions can you make from the debug flow output? (Choose two answers)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Default gateway is configured on port2."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The RPF check fails."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The Debug flow is for UDP traffic."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The Matching firewall policy denies the traffic."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "D"
    ],
    "tags": [
      "Debug Flow",
      "CLI",
      "Troubleshooting"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** no debug flow, leia proto, route lookup e a linha \"Denied by...\".\n- ✅ A: o lookup encontrou a saída via port2.\n- ❌ B: o RPF passou, porque o fluxo seguiu para o policy check.\n- ❌ C: proto=1 é ICMP (type 8 = ping).\n- ✅ D: \"Denied by forward policy check (policy 2)\"."
  },
  {
    "id": "q-56",
    "docNumber": 56,
    "origin": "56. Which three statements explain a flow-based antivirus profile? (Choose three answers)",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Which three statements explain a flow-based antivirus profile? (Choose three answers)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "FortiGate buffers the whole file but transmits to the client at the same time."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Flow-based inspection uses a hybrid of the scanning modes available in proxy-based inspection."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "If a virus is detected, the last packet is delivered to the client."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Flow-based inspection optimizes performance compared to proxy-based inspection."
      },
      {
        "id": "opt-E",
        "letter": "E",
        "text": "The IPS engine handles the process as a standalone."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 3,
    "correctAnswers": [
      "A",
      "B",
      "D"
    ],
    "tags": [
      "Antivirus",
      "Flow-based"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** AV flow-based: transmite e guarda ao mesmo tempo, retém só o último pacote, usa um híbrido dos scan modes do proxy e é mais rápido.\n- ✅ A: bufferiza e transmite ao mesmo tempo.\n- ✅ B: híbrido dos modos do proxy.\n- ❌ C: com vírus, o último pacote **não** é entregue.\n- ✅ D: melhor desempenho que o proxy.\n- ❌ E: o IPS engine passa o arquivo para o scanunit."
  },
  {
    "id": "q-57",
    "docNumber": 57,
    "origin": "57. Refer to the exhibits.",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibits."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibits: Security Fabric logical topology view (HQ-NGFW-1 Fabric Root, FortiAnalyzer, HQ-ISFW) and Security Fabric settings on HQ-ISFW-2 (Status Pending)",
        "url": "exhibits/q57-1.jpeg"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "An administrator wants to add HQ-ISFW-2 in the Security Fabric. HQ-ISFW-2 is in the same subnet as HQ-ISFW. After configuring the Security Fabric settings on HQ-ISFW-2, the status stays Pending. What can be the two possible reasons? (Choose two answers)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Upstream FortiGate IP must be set to 10.0.11.254."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "SAML Single Sign On must be set to Manual."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "HQ-ISFW-2 must be authorized on HQ-ISFW."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Management IP must be set to 10.0.13.254."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "C"
    ],
    "tags": [
      "Security Fabric"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** o downstream aponta para o IP do root na rede dele, e o root precisa autorizá-lo.\n- ✅ A: Upstream IP = 10.0.11.254.\n- ❌ B: SAML SSO não afeta a entrada no Fabric.\n- ✅ C: precisa de autorização.\n- ❌ D: o Management IP é do próprio equipamento."
  },
  {
    "id": "q-58",
    "docNumber": 58,
    "origin": "58. What is the primary FortiGate election process when HA override is enabled?",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "What is the primary FortiGate election process when HA override is enabled?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Connected monitored ports > Priority > HA uptime > Fortigate Serial number."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Connected monitored ports > Priority > System uptime > Fortigate Serial number."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Connected monitored ports > HA uptime > Priority > Fortigate Serial number."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Connected monitored ports > System uptime > Priority > Fortigate Serial number."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "HA",
      "Election",
      "FGCP"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** com override enable, a eleição é monitored ports > priority > **HA** uptime > serial.\n- ✅ A: ordem correta.\n- ❌ B: system uptime não entra na eleição.\n- ❌ C: essa é a ordem com override disable.\n- ❌ D: system uptime e ordem errada."
  },
  {
    "id": "q-59",
    "docNumber": 59,
    "origin": "59. = questao 50 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "img59-1",
        "type": "image",
        "url": "exhibits/q59-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b2",
        "type": "terminal",
        "content": "date=2025-02-4 time=09:07:59 logid=0100022700 type=event subtype=system level=critical vd=\"root\" logdesc=\"IPS session scan paused\" action=\"drop\" msg=\"IPS session scan, enter fail open mode\""
      },
      {
        "id": "b3",
        "type": "text",
        "content": "What can you conclude from the log shown in the exhibit?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The IPS socket buffer is full and IPS engine needs more memory to create new sessions."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The IPS socket buffer is full and IPS engine cannot decode a packet."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The IPS scan is paused by the IPS diagnostic command with bypass mode option 5."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The IPS session scan is paused and reevaluating the packet because of a dirty flag."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "IPS",
      "Logs",
      "Fail Open"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** IPS fail-open = socket buffer cheio e sem memória para novas sessões.\n- ✅ A: buffer cheio e falta memória.\n- ❌ B: não é erro de decode.\n- ❌ C: bypass (opção 5) é manual.\n- ❌ D: dirty flag é da tabela de sessões."
  },
  {
    "id": "q-60",
    "docNumber": 60,
    "origin": "60. = questao 51 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibit: Network diagram showing Sales (port1), Engineering (port2), Support (port3) connected to FortiGate and Web server",
        "url": "exhibits/q60-1.jpeg"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "FortiGate has two separate firewall policies for Sales and Engineering to access the same web server with the same security profiles.\nWhich action must the administrator perform to consolidate the two policies into one?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Select port1 and port2 subnets in a single firewall policy."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Create an Aggregate interface that includes port1 and port2 to create a single firewall policy."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Replace port1 and port2 with the any interface in a single firewall policy."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Enable Multiple Interface Policies to select port1 and port2 in the same firewall policy"
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "D"
    ],
    "tags": [
      "Firewall Policy",
      "Multiple Interface Policies"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** para usar várias interfaces numa policy, habilite Multiple Interface Policies (ou use zone).\n- ❌ A: subnets não são interfaces.\n- ❌ B: aggregate é LACP e juntaria as redes.\n- ❌ C: `any` incluiria a port3.\n- ✅ D: habilitar Multiple Interface Policies."
  },
  {
    "id": "q-61",
    "docNumber": 61,
    "origin": "61. = questao 53 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit. An intrusion prevention system (IPS) profile signature setting is shown."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibit: IPS profile signature setting (Add Signatures, Type Signature, Action Block, Packet logging Enable, Name FTP.Login.Failed, Severity Low, Target Server, OS All, Action Pass)",
        "url": "exhibits/q61-1.jpeg"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "What can you conclude about the signature when adding the FTP.Login.Failed signature to the IPS Sensor profile?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The signature setting uses a custom rating threshold."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "FortiGate allows this low severity signature packet and creates a log."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "FortiGate stores a local copy of the packet that matches the signature."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The signature setting includes a group of other signatures."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "IPS",
      "Signatures"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** a action da entrada (Block) sobrescreve a ação padrão (Pass). Packet logging guarda uma cópia do pacote.\n- ❌ A: o rate-based está em Default.\n- ❌ B: está em Block, não em Allow.\n- ✅ C: guarda uma cópia local do pacote.\n- ❌ D: Type = Signature, não Filter."
  },
  {
    "id": "q-62",
    "docNumber": 62,
    "origin": "62. = questao 56 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "A network administrator enabled antivirus and selected an SSL inspection profile on a firewall policy.\nWhen downloading an EICAR test file through HTTP, FortiGate detects the virus and blocks the file. When downloading the same file through HTTPS, FortiGate does not detect the virus and does not block the file, allowing it to be downloaded.\nThe administrator confirms that the traffic matches the configured firewall policy. \nWhat are two reasons for the failed virus detection by FortiGate? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The selected SSL inspection profile has certificate inspection enabled."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The browser does not trust the FortiGate self-signed CA certificate."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The website is exempted from SSL inspection."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The EICAR test file exceeds the protocol options oversize limit."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "C"
    ],
    "tags": [
      "Antivirus",
      "SSL Inspection",
      "EICAR"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** o AV só vê arquivo HTTPS se houver descriptografia (deep inspection).\n- ✅ A: certificate inspection não descriptografa.\n- ❌ B: desconfiar da CA só gera aviso no navegador.\n- ✅ C: site isento não é descriptografado.\n- ❌ D: o EICAR tem 68 bytes."
  },
  {
    "id": "q-63",
    "docNumber": 63,
    "origin": "63. = questao 63 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Which two statements about equal-cost multi-path (ECMP) configuration on FortiGate are true? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "If SD-WAN is disabled, you configure the load balancing algorithm in config system settings."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "If SD-WAN is disabled, you can configure the parameter v4-ecmp-mode to volume-based."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "If SD-WAN is enabled, you control the load balancing algorithm with the parameter load-balance-mode."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "If SD-WAN is enabled, you can configure routes with unequal distance and priority values to be part of ECMP."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "C"
    ],
    "tags": [
      "ECMP",
      "Routing",
      "SD-WAN"
    ],
    "warnings": [],
    "domain": "routing",
    "explanation": "**Conceito:** ECMP sem SD-WAN usa o `v4-ecmp-mode` (system settings). Com SD-WAN, usa o `load-balance-mode`.\n- ✅ A: sem SD-WAN, configura em `config system settings`.\n- ❌ B: o `v4-ecmp-mode` não tem volume.\n- ✅ C: com SD-WAN, usa o `load-balance-mode`.\n- ❌ D: ECMP exige distance, metric e priority iguais."
  },
  {
    "id": "q-64",
    "docNumber": 64,
    "origin": "64. = questao 64 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "img64-1",
        "type": "image",
        "url": "exhibits/q64-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b2",
        "type": "terminal",
        "content": "Packet trace output:\n06:39:29  vd-root:0 received a packet(proto=1, 10.0.11.50:3->100.65.0.254:2048) tun_id=0.0.0.0 from port4, type=8, code=0, id=3, seq=168\n06:39:29  allocate a new session-00000ec6\n06:39:29  in-[port4], out-[]\n06:39:29  len=0\n06:39:29  result: skb_flags-02000000, vid-0, ret-no-match, act-accept, flag-00000000\n06:39:29  find a route: flag=00000000 gw-0.0.0.0 via port2\n06:39:29  in-[port4], out-[port2], skb_flags-02000000, vid-0, app_id: 0, url_cat_id: 0\n06:39:29  gnum-100004, use addr/intf hash, len=1\n06:39:29  checked gnum-100004 policy-0, ret-matched, act-accept\n06:39:29  ret-matched\n06:39:29  policy-0 is matched, act-drop\n06:39:29  after iprope_captive_check(): is_captive-0, ret-matched, act-drop, idx-0\n06:39:29  after iprope_captive_check(): is_captive=0, ret-matched, act-drop, idx-0\n06:39:29  Denied by forward policy check (policy 0)"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "Why did the FortiGate device drop the packet?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "It matched the default implicit firewall policy."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "It failed the RPF check."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "It matched an explicitly configured firewall policy with the action DENY."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "It cannot reach the next-hop IP"
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "Packet Trace",
      "Firewall Policy",
      "Troubleshooting"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** policy 0 no debug flow = implicit deny.\n- ✅ A: casou a implicit deny.\n- ❌ B: RPF falho mostraria \"reverse path check fail\".\n- ❌ C: uma policy explícita não teria ID 0.\n- ❌ D: a rota foi encontrada."
  },
  {
    "id": "q-65",
    "docNumber": 65,
    "origin": "65. = questao 61 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "What are three key routing principles in SD-WAN? (Choose three.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "SD-WAN rules have precedence over any other type of routes."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "By default, SD-WAN rules are skipped if only one route to the destination is available."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Regular policy routes have precedence over SD-WAN rules."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "By default, SD-WAN rules are skipped if the included SD-WAN members do not have a valid route to the destination."
      },
      {
        "id": "opt-E",
        "letter": "E",
        "text": "By default, SD-WAN rules are skipped if the best route to the destination is not an SD-WAN member"
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 3,
    "correctAnswers": [
      "C",
      "D",
      "E"
    ],
    "tags": [
      "SD-WAN",
      "Routing Principles"
    ],
    "warnings": [],
    "domain": "routing",
    "explanation": "**Conceito:** a SD-WAN rule só vale se a melhor rota for um membro e o membro estiver vivo e com rota. Policy route vem antes.\n- ❌ A: policy routes vêm antes das SD-WAN rules.\n- ❌ B: uma única rota não faz a regra ser pulada.\n- ✅ C: policy routes têm precedência.\n- ✅ D: é pulada se nenhum membro tiver rota válida.\n- ✅ E: é pulada se a melhor rota não for um membro do SD-WAN."
  },
  {
    "id": "q-66",
    "docNumber": 66,
    "origin": "66. = questao 77 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "An administrator configures FortiGuard servers as DNS servers on FortiGate using default settings. What is true about the DNS connection to a FortiGuard server?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "It uses UDP 53."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "It uses DNS over HTTPS."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "It uses DNS over TLS."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "It uses UDP 8888."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "FortiGuard",
      "DNS"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** com os servidores DNS da FortiGuard, o padrão é DNS over TLS (TCP 853).\n- ❌ A: UDP 53 é o cleartext.\n- ❌ B: DoH existe, mas não é o padrão.\n- ✅ C: DoT.\n- ❌ D: a 8888 é porta de rating da FortiGuard."
  },
  {
    "id": "q-67",
    "docNumber": 67,
    "origin": "67. = questao 80 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "img67-1",
        "type": "image",
        "url": "exhibits/q67-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b2",
        "type": "terminal",
        "content": "HQ-NGFW-1 HA configuration:\nHQ-NGFW-1 # config system ha\nHQ-NGFW-1 (ha) # show\nconfig system ha\n    set group-id 5\n    set group-name \"Training\"\n    set mode a-p\n    set password ENC nmk7zGYiRrux1\n    set hbdev \"port7\" 0\n    set session-pickup enable\n    set override disable\n    set priority 200\n    set monitor \"port1\"\nend\n\nHQ-NGFW-2 HA configuration:\nHQ-NGFW-2 (ha) # show\nconfig system ha\n    set group-id 5\n    set group-name \"Training\"\n    set mode a-p\n    set password ENC n4OG3jdm0K50s\n    set hbdev \"port7\" 0\n    set session-pickup enable\n    set override disable\n    set priority 100\n    set monitor \"port1\"\nend"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "An administrator configured both members of an HA cluster at the same time. After one week of monitoring, the administrator wants to verify the HA failover performance. How can the administrator force a failover?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The administrator must reset the HA uptime on HQ-NGFW-1."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The administrator must set the parameter override to enable on HQ-NGFW-2."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The administrator must set the monitored port1 to down on HQ-NGFW-1."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The administrator must increase the HA priority on HQ-NGFW-2."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "HA",
      "FGCP",
      "Failover"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** com override disable, o HA uptime decide antes da priority. `diagnose sys ha reset-uptime` força o failover.\n- ✅ A: zerar o uptime do NGFW-1.\n- ❌ B: com override, a priority 100 continua perdendo para 200.\n- ❌ C: derrubar a port1 simula uma falha, não é o failover manual.\n- ❌ D: com override disable, mudar a priority não dispara eleição."
  },
  {
    "id": "q-68",
    "docNumber": 68,
    "origin": "68. = questao 81 do documento \"dump exam topics v1.1\"",
    "blocks": [
      {
        "id": "img68-1",
        "type": "image",
        "url": "exhibits/q68-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b1",
        "type": "text",
        "content": "An administrator has configured the following settings."
      },
      {
        "id": "b2",
        "type": "terminal",
        "content": "config system settings\n    set ses-denied-traffic enable\nend\n\nconfig system global\n    set block-session-timer 30\nend"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "What are the two results of this configuration? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The number of logs generated by denied traffic is reduced."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "A session for denied traffic is created."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Denied users are blocked for 30 minutes."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Session helpers are disabled for denied traffic"
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "B"
    ],
    "tags": [
      "Sessions",
      "CLI",
      "Denied Traffic"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** `ses-denied-traffic` cria uma sessão para o tráfego negado. Isso reduz policy lookups e logs.\n- ✅ A: menos logs.\n- ✅ B: cria uma sessão de deny.\n- ❌ C: o timer é em segundos e não bloqueia usuários.\n- ❌ D: session helpers não têm relação com isso."
  },
  {
    "id": "q-69",
    "docNumber": 69,
    "origin": "69. = questao 57 do site “examtopics”",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibits."
      },
      {
        "id": "b2",
        "type": "image",
        "pending": false,
        "label": "Exhibits: Network diagram (Workstation 10.0.11.50/24 -> LAN port4 10.0.11.254/24 -> WAN port2 100.65.0.101/24), VIP configuration, Firewall policies (Policy 1: Internet ACCEPT, IP Pool; Policy 2: WebServer ACCEPT VIP)",
        "url": "exhibits/q69-1.jpeg"
      },
      {
        "id": "img69-2",
        "type": "image",
        "url": "exhibits/q69-2.jpeg",
        "pending": false,
        "label": "Exhibit 2"
      },
      {
        "id": "img69-3",
        "type": "image",
        "url": "exhibits/q69-3.jpeg",
        "pending": false,
        "label": "Exhibit 3"
      },
      {
        "id": "img69-4",
        "type": "image",
        "url": "exhibits/q69-4.png",
        "pending": false,
        "label": "Exhibit 4"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "The exhibits show a diagram of a FortiGate device connected to the network, and the firewall policies, VIP, and IP pool configurations on the FortiGate device.\nThe WAN (port2) interface has the IP address 100.65.0.101/24.\nThe LAN (port4) interface has the IP address 10.0.11.254/24.\nThe first firewall policy has NAT enabled using the IP pool. The second firewall policy is configured with a VIP as the destination address.\nWhich IP address will be used to source NAT (SNAT) the internet traffic coming from a workstation with the IP address 10.0.11.50?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "100.65.0.200"
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "100.65.0.102"
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "100.65.0.101"
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "10.0.11.254"
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "B"
    ],
    "tags": [
      "NAT",
      "SNAT",
      "Firewall Policy"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** a policy com NAT + IP Pool faz o SNAT com o IP do pool.\n- ❌ A: o IP do VIP só seria usado em static NAT sem port forwarding e sem pool.\n- ✅ B: o IP Pool, 100.65.0.102.\n- ❌ C: o IP da WAN seria usado em NAT sem pool.\n- ❌ D: é o IP interno da LAN."
  },
  {
    "id": "q-70",
    "docNumber": 70,
    "origin": "70. = questao 58 do site “examtopics”",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit, which shows a partial configuration from the remote authentication server."
      },
      {
        "id": "img70-1",
        "type": "image",
        "url": "exhibits/q70-1.jpeg",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b2",
        "type": "terminal",
        "content": "Attribute               Value       Vendor      Actions\nFortinet-Group-Name     Training    Fortinet    Edit / Delete"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "Why does the FortiGate administrator need this configuration?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "To authenticate only the Training user group."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "To authenticate Any FortiGate user groups."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "To authenticate and match the Training OU on the RADIUS server."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "To set up a RADIUS server Secret."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "RADIUS",
      "Authentication"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** o VSA Fortinet-Group-Name + group match restringem o user group a usuários com aquele valor.\n- ✅ A: autentica só o grupo Training.\n- ❌ B: aceitar qualquer usuário é o padrão sem o atributo.\n- ❌ C: OU é conceito de LDAP.\n- ❌ D: o secret não é atributo."
  },
  {
    "id": "q-71",
    "docNumber": 71,
    "origin": "71. = questao 66 do site “examtopics”",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "An administrator suspects that the Collector Agent is not forwarding login events to FortiGate.\nWhat is the most effective troubleshooting step?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Verify if DC agent is enabled on the FortiGate."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Restart the domain controller to refresh authentication services."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Check if TCP port 8000 is open between the collector agent and FortiGate."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Verify if FortiGate is set to use LDAP authentication instead of FSSO."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "FSSO",
      "Collector Agent",
      "Troubleshooting"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** collector → FortiGate = TCP 8000; DC agent → collector = UDP 8002.\n- ❌ A: o DC agent roda no DC.\n- ❌ B: reiniciar o DC é drástico e não diagnostica nada.\n- ✅ C: verificar a TCP 8000.\n- ❌ D: LDAP e FSSO coexistem."
  },
  {
    "id": "q-72",
    "docNumber": 72,
    "origin": "72. = questao 67 do site “examtopics”",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "A network administrator wants to set up redundant IPsec VPN tunnels on FortiGate by using two IPsec VPN tunnels and static routes.\nAll traffic must be routed through the primary tunnel when both tunnels are up. The secondary tunnel must be used only if the primary tunnel goes down. In addition, FortiGate should be able to detect a dead tunnel to speed up tunnel failover.\nWhich two key configuration changes must the administrator make on FortiGate to meet the requirements? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Enable Dead Peer Detection."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Use the VPN wizard to create an IPsec template for a redundant IPsec VPN tunnel."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Configure a lower distance on the static route for the primary tunnel, and a higher distance on the static route for the secondary tunnel."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "In the phase1-interface, enable npu-offload to detect a dead tunnel."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "C"
    ],
    "tags": [
      "IPsec",
      "VPN",
      "Redundancy",
      "Routing"
    ],
    "warnings": [],
    "domain": "vpn",
    "explanation": "**Conceito:** VPN redundante: o DPD derruba o túnel morto e a rota de menor distance define o primário.\n- ✅ A: DPD.\n- ❌ B: não existe template \"redundante\" no wizard.\n- ✅ C: distance menor no primário e maior no secundário.\n- ❌ D: npu-offload é desempenho, não detecção."
  },
  {
    "id": "q-74",
    "docNumber": 74,
    "origin": "74. = questao 69 do site “examtopics”",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "An administrator wants to address shadow IT visibility challenges and prevent users from sending sensitive files outside the organization without proper approval.\nWhich FortiSASE method should the administrator implement to achieve these goals?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Secure internet access (SIA)"
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Secure private access (SPA)"
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Secure SaaS access (SSA)"
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Secure SD-WAN access (SSD-WAN)"
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "FortiSASE",
      "SSA"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** FortiSASE: shadow IT e DLP de SaaS = Secure SaaS Access (CASB + DLP).\n- ❌ A: SIA protege a navegação contra ameaças.\n- ❌ B: SPA dá acesso a aplicações privadas.\n- ✅ C: SSA.\n- ❌ D: SSD-WAN não existe."
  },
  {
    "id": "q-75",
    "docNumber": 75,
    "origin": "75. = questao 70 do site “examtopics”",
    "blocks": [
      {
        "id": "b1",
        "type": "image",
        "pending": false,
        "label": "Exhibit: Logging Settings (FortiAnalyzer Status Enabled, Server 10.0.13.125, Upload option Real Time)",
        "url": "exhibits/q75-1.jpeg"
      },
      {
        "id": "b2",
        "type": "text",
        "content": "You are configuring FortiAnalyzer on FortiGate.\nWhich step must you take to connect FortiAnalyzer to FortiGate?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Verify the FortiAnalyzer serial number."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Enable disk logging on FortiGate."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Authorize FortiGate on FortiAnalyzer."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Configure UDP port 514 on FortiGate."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "FortiAnalyzer",
      "Logging"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** o FortiAnalyzer só aceita logs de dispositivo autorizado no Device Manager.\n- ❌ A: o serial só é confirmado com \"Verify certificate\" ligado.\n- ❌ B: disk logging é independente.\n- ✅ C: autorizar o FortiGate no FortiAnalyzer.\n- ❌ D: a UDP 514 já é o padrão."
  },
  {
    "id": "q-76",
    "docNumber": 76,
    "origin": "76. = questao 70 do site “examtopics”",
    "blocks": [
      {
        "id": "b1",
        "type": "image",
        "pending": false,
        "label": "Exhibits: Network diagram (Remote-User1 203.0.115.23, Remote-User2 201.0.114.23 -> FortiGate -> Webserver 10.0.1.10), Firewall address object (Deny_IP 201.0.114.23/32), Firewall policies (Policy 4: Deny WAN port1 -> LAN port3 Source Deny_IP Destination all DENY, Policy 3: Allow_access Source all Destination Webserver ACCEPT)",
        "url": "exhibits/q76-1.jpeg"
      },
      {
        "id": "img76-2",
        "type": "image",
        "url": "exhibits/q76-2.jpeg",
        "pending": false,
        "label": "Exhibit 2"
      },
      {
        "id": "img76-3",
        "type": "image",
        "url": "exhibits/q76-3.jpeg",
        "pending": false,
        "label": "Exhibit 3"
      },
      {
        "id": "b2",
        "type": "text",
        "content": "The exhibits show a diagram of a FortiGate device connected to the network, and the firewall configuration.\nAn administrator created a Deny policy with default settings to deny Webserver access for Remote-User2.\nThe policy should work such that Remote-User1 must be able to access the Webserver while preventing Remote-User2 from accessing the Webserver.\nWhich additional configuration can the administrator add to a deny firewall policy, beyond the default behavior, to block Remote-User2 from accessing the Webserver?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Set the Destination address as Webserver in the Deny policy."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Disable match-vip in the Allow_access policy."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Set the Destination address as Deny_IP in the Allow_access policy."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Configure a One-to-One IP Pool object in a new policy."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "Firewall Policy",
      "VIP",
      "Deny Policy"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** para a deny pegar tráfego para VIP, coloque o VIP como destino (ou match-vip enable, que é padrão desde a 7.2.4).\n- ✅ A: Webserver (VIP) como destino da Deny.\n- ❌ B: match-vip só existe em policy DENY.\n- ❌ C: Deny_IP é origem, e como destino quebraria o acesso de todos.\n- ❌ D: IP Pool é SNAT."
  },
  {
    "id": "q-77",
    "docNumber": 77,
    "origin": "77. = questao 74 do site “examtopics”",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "You have configured the FortiGate device for FSSO. A user is successful in log-in to windows, but their access to the internet is denied.\nWhat should the administrator check first?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The FortiGate firewall policy settings for SSL decryption."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The FortiGate FSSO active users list for user’s IP address."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The windows event viewer for failed login attempts."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Whether the user is assigned to the correct AD group."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "B"
    ],
    "tags": [
      "FSSO",
      "Troubleshooting"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** usuário FSSO bloqueado: primeiro veja se o IP dele está no `diagnose debug authd fsso list`.\n- ❌ A: SSL inspection não é a causa.\n- ✅ B: verificar a lista FSSO pelo IP.\n- ❌ C: o login no Windows teve sucesso.\n- ❌ D: o grupo vem depois, e o `fsso list` já mostra o grupo."
  },
  {
    "id": "q-78",
    "docNumber": 78,
    "origin": "78. = questao 82 do site “examtopics”",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Which two features of IPsec IKEv1 authentication are supported by FortiGate? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Pre-shared key and certificate signature as authentication methods"
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "No certificate is required on the remote peer when you set the certificate signature as the authentication method"
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Extended authentication (XAuth) to request the remote peer to provide a username and password"
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Extended authentication (XAuth) for faster authentication because fewer packets are exchanged"
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "C"
    ],
    "tags": [
      "IPsec",
      "IKEv1",
      "Authentication"
    ],
    "warnings": [],
    "domain": "vpn",
    "explanation": "**Conceito:** Phase 1 IKEv1 autentica por PSK ou certificado. O XAuth adiciona usuário e senha (mais seguro, com mais pacotes).\n- ✅ A: PSK e certificado.\n- ❌ B: com signature, os dois lados precisam de certificado.\n- ✅ C: XAuth pede usuário e senha.\n- ❌ D: XAuth tem **mais** pacotes, não é mais rápido."
  },
  {
    "id": "q-79",
    "docNumber": 79,
    "origin": "questao 79 do documento \"dump_7.6 VERSAO_3\" = questao 60 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit to view the firewall policy."
      },
      {
        "id": "b2",
        "type": "image",
        "url": "exhibits/q79-1.png",
        "pending": false,
        "label": "Exhibit"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "Why would the firewall policy not block a well-known virus, for example EICAR? (Choose one answer)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The action on the firewall policy is not set to DENY."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Web filter is not enabled, so the firewall policy does not complement the antivirus profile."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The firewall policy is not configured in proxy-based inspection mode."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The firewall policy does not apply deep content inspection."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "D"
    ],
    "tags": [
      "Antivirus",
      "Firewall Policy",
      "SSL Inspection"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** sem deep inspection o FortiGate não enxerga o conteúdo cifrado (HTTPS), então o antivírus não acha o EICAR.\n- ❌ A: com DENY o tráfego nem passaria; o objetivo é inspecionar e bloquear o vírus.\n- ❌ B: o antivírus funciona sozinho, não depende do web filter.\n- ❌ C: o modo flow-based também detecta o EICAR.\n- ✅ D: certificate inspection só olha o certificado, não o conteúdo."
  },
  {
    "id": "q-80",
    "docNumber": 80,
    "origin": "questao 80 do documento \"dump_7.6 VERSAO_3\" = questao 62 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Which three methods are used by the collector agent for AD polling? (Choose three answers)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "NetAPI"
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "WMI"
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "WinSecLog"
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "DNS reverse lookup"
      },
      {
        "id": "opt-E",
        "letter": "E",
        "text": "FSSO REST API"
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 3,
    "correctAnswers": [
      "A",
      "B",
      "C"
    ],
    "tags": [
      "FSSO",
      "Collector Agent",
      "AD Polling"
    ],
    "warnings": [],
    "domain": "firewall_auth",
    "explanation": "**Conceito:** o collector agent faz polling dos DCs por NetAPI, WMI ou WinSecLog.\n- ✅ A: NetAPI consulta as sessões do DC.\n- ✅ B: WMI lê os eventos de logon pelo WMI.\n- ✅ C: WinSecLog lê o Security Event Log.\n- ❌ D: DNS reverso resolve o IP da estação, não é método de polling.\n- ❌ E: REST API não é método de AD polling do collector agent."
  },
  {
    "id": "q-81",
    "docNumber": 81,
    "origin": "questao 81 do documento \"dump_7.6 VERSAO_3\" = questao 67 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "b2",
        "type": "image",
        "url": "exhibits/q81-1.png",
        "pending": false,
        "label": "Exhibit"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "The exhibit shows the FortiGuard Category Based Filter section of a corporate web filter profile. An administrator must block access to download.com, which belongs to the Freeware and Software Downloads category. The administrator must also allow other websites in the same category. What are two solutions for satisfying the requirement? (Choose two answers)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Configure a static URL filter entry for download.com with Type and Action set to Wildcard and Block, respectively."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Configure a web override rating for download.com and select Malicious Websites as the subcategory."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Configure a separate firewall policy with action Deny and an FQDN address object for *.download.com as destination address."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Set the Freeware and Software Downloads category Action to Warning."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "B"
    ],
    "tags": [
      "Web Filter",
      "URL Filter",
      "Rating Override"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** para bloquear um site sem bloquear a categoria inteira, use URL filter estático ou rating override para uma categoria bloqueada.\n- ✅ A: URL filter wildcard com Block bloqueia só o download.com.\n- ✅ B: o override joga o site numa categoria bloqueada (Malicious Websites).\n- ❌ C: policy com FQDN não é a solução de web filter esperada e afeta outros serviços.\n- ❌ D: Warning afeta a categoria inteira e ainda deixa o usuário prosseguir."
  },
  {
    "id": "q-82",
    "docNumber": 82,
    "origin": "questao 82 do documento \"dump_7.6 VERSAO_3\" = questao 70 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "An administrator creates a new address object on the root FortiGate (HQ-NGFW-1) in the Security Fabric. After synchronization, this object is not available on the downstream FortiGate (HQ-ISFW)."
      },
      {
        "id": "b2",
        "type": "image",
        "url": "exhibits/q82-1.png",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b3",
        "type": "image",
        "url": "exhibits/q82-2.png",
        "pending": false,
        "label": "Exhibit 2"
      },
      {
        "id": "b4",
        "type": "text",
        "content": "What must the administrator do to synchronize the address object?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Change the csf setting on HQ-ISFW (downstream) to set configuration-sync local."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Change the csf setting on HQ-ISFW (downstream) to set saml-configuration-sync default."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Change the csf setting on HQ-NGFW-1 (root) to set fabric-object-unification default."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Change the csf setting on both devices to set downstream-access enable."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "Security Fabric",
      "Object Sync",
      "CSF"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** a sincronização de objetos do Fabric é controlada no root por `fabric-object-unification`.\n- ❌ A: `configuration-sync local` faz o downstream **não** aceitar a config do root.\n- ❌ B: SAML sync trata de SSO, não de objetos de endereço.\n- ✅ C: com `default` no root, os objetos são enviados aos downstream.\n- ❌ D: downstream-access controla acesso de gestão, não sync de objetos."
  },
  {
    "id": "q-83",
    "docNumber": 83,
    "origin": "questao 83 do documento \"dump_7.6 VERSAO_3\" = questao 73 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "When configuring the connection between FortiGate and FortiAnalyzer, which option indicates that reliable traffic is enabled? (Choose one answer)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The connection status shows a green check icon"
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The interface status is set to up"
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "A padlock icon appears in the connection settings"
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The logging mode is set to real-time"
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "FortiAnalyzer",
      "Logging",
      "Reliable"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** com reliable logging (TCP + criptografia), a GUI mostra um cadeado na conexão com o FortiAnalyzer.\n- ❌ A: o check verde só indica que a conexão está ativa.\n- ❌ B: status da interface não diz nada sobre reliable.\n- ✅ C: o cadeado indica tráfego reliable/criptografado.\n- ❌ D: real-time é o modo de upload, não o reliable."
  },
  {
    "id": "q-84",
    "docNumber": 84,
    "origin": "questao 84 do documento \"dump_7.6 VERSAO_3\" = questao 75 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "When configuring a FortiGate in a multi-WAN setup, why would an administrator enable session preservation on an interface? (Choose one answer)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "To allow the FortiGate to dynamically change interfaces for all active sessions when a WAN link fails"
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "To make sure all sessions without source NAT enabled always use the primary WAN link"
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "To improve security by forcing users to authenticate again when the WAN link changes"
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "To ensure that existing SSL VPN connections remain on the same interface even if route changes occur"
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "D"
    ],
    "tags": [
      "SD-WAN",
      "Session Preservation",
      "Multi-WAN"
    ],
    "warnings": [],
    "domain": "routing",
    "explanation": "**Conceito:** session preservation mantém sessões existentes na mesma interface mesmo com mudança de rota.\n- ❌ A: é o contrário: preservar evita trocar a interface das sessões.\n- ❌ B: não tem relação com sessões sem SNAT.\n- ❌ C: não força nova autenticação.\n- ✅ D: conexões existentes (como SSL VPN) ficam na mesma interface."
  },
  {
    "id": "q-85",
    "docNumber": 85,
    "origin": "questao 85 do documento \"dump_7.6 VERSAO_3\" = questao 76 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Exhibits:"
      },
      {
        "id": "b2",
        "type": "image",
        "url": "exhibits/q85-1.png",
        "pending": false,
        "label": "Exhibit"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "You are asked to implement an antivirus profile for files downloaded through FTP, HTTP, and HTTPS. While testing, you are successful with HTTP and FTP protocols, but FortiGate does not block the file download over HTTPS. What could be the cause?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "The feature set in the antivirus profile is not set to Flow-based."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Web filter is not enabled on the firewall policy to complement the antivirus profile."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The action on the firewall policy is not set to deny."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "The SSL inspection mode in the firewall policy is not deep content inspection."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "D"
    ],
    "tags": [
      "Antivirus",
      "HTTPS",
      "SSL Inspection"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** HTTP e FTP são abertos; HTTPS só é inspecionado com deep content inspection.\n- ❌ A: proxy-based também inspeciona, o problema é a criptografia.\n- ❌ B: o antivírus não depende do web filter.\n- ❌ C: DENY bloquearia tudo, não é o objetivo.\n- ✅ D: sem deep inspection o arquivo dentro do HTTPS não é visto."
  },
  {
    "id": "q-86",
    "docNumber": 86,
    "origin": "questao 86 do documento \"dump_7.6 VERSAO_3\" = questao 78 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "You are onboarding an agentless, secure web gateway (SWG) endpoint for secure internet access (SIA). What will happen to the user's nonweb traffic? (Choose one answer)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "All the nonweb traffic will bypass FortiSASE."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The endpoint will use split tunneling to redirect nonweb traffic to FortiSASE."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "FortiSASE will use Firewall-as-a-Service (FWaaS) to redirect nonweb traffic."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "FortiSASE will use SWG to redirect nonweb traffic to FortiExtender."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "FortiSASE",
      "SWG",
      "SIA"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** no modo SWG agentless só o tráfego web (via proxy/PAC) vai ao FortiSASE.\n- ✅ A: tráfego não-web não passa pelo FortiSASE.\n- ❌ B: split tunneling é do modo com agente (FortiClient).\n- ❌ C: FWaaS exige o túnel do agente, não o SWG.\n- ❌ D: FortiExtender não tem papel aqui."
  },
  {
    "id": "q-87",
    "docNumber": 87,
    "origin": "questao 87 do documento \"dump_7.6 VERSAO_3\" = questao 79 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "b2",
        "type": "image",
        "url": "exhibits/q87-1.png",
        "pending": false,
        "label": "Exhibit"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "An administrator has created a new firewall address to use as the destination for a static route. Why is the administrator not able to select the new address in the Destination field of the new static route? (Choose one answer)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "In the new static route, the administrator must select Named Address."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "In the new firewall address, the FQDN address must first be resolved."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "In the new static route, the administrator must first set the interface to port2."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "In the new firewall address, Routing configuration must be enabled."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "D"
    ],
    "tags": [
      "Static Route",
      "Address Object"
    ],
    "warnings": [],
    "domain": "routing",
    "explanation": "**Conceito:** um address object só aparece como destino de rota estática com **Routing configuration** habilitado (`allow-routing`).\n- ❌ A: mesmo em Named Address, o objeto não aparece sem allow-routing.\n- ❌ B: resolver o FQDN não libera o uso em rota.\n- ❌ C: a interface não filtra a lista de endereços.\n- ✅ D: é preciso habilitar Routing configuration no objeto."
  },
  {
    "id": "q-88",
    "docNumber": 88,
    "origin": "questao 88 do documento \"dump_7.6 VERSAO_3\" = questao 88 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Refer to the exhibit."
      },
      {
        "id": "b2",
        "type": "image",
        "url": "exhibits/q88-1.png",
        "pending": false,
        "label": "Exhibit"
      },
      {
        "id": "b3",
        "type": "text",
        "content": "A network administrator is troubleshooting an IPsec tunnel between two FortiGate devices. The administrator has determined that phase 1 failed to come up. The administrator has also re-entered the pre-shared key on both FortiGate devices to make sure they match. Based on the phase 1 configuration and the diagram shown in the exhibit, which two configuration changes can the administrator make to bring phase 1 up? (Choose two.)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "On HQ-NGFW, disable Diffie-Hellman group 2."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "On HQ-NGFW, set IKE mode to Main (ID protection)."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "On BR1-FGT, set port2 to Interface."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "On both FortiGate devices, set Dead Peer Detection to On Demand."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "B",
      "C"
    ],
    "tags": [
      "IPsec",
      "Phase 1",
      "Troubleshooting"
    ],
    "warnings": [],
    "domain": "vpn",
    "explanation": "**Conceito:** a phase 1 só sobe se o modo IKE e a interface de saída estiverem corretos (HQ está em Aggressive, o remoto em Main).\n- ❌ A: os dois lados já têm o DH grupo 5 em comum.\n- ✅ B: o modo IKE (Main x Aggressive) precisa ser igual.\n- ✅ C: no lado remoto a Interface está como port1, mas o link de saída é a port2.\n- ❌ D: DPD não impede a phase 1 de subir."
  },
  {
    "id": "q-89",
    "docNumber": 89,
    "origin": "questao 89 do documento \"dump_7.6 VERSAO_3\" = questao 89 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "A network administrator is configuring an IPsec VPN tunnel for a sales employee travelling abroad. Which VPN Wizard template must the administrator apply?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Remote Access"
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Hub-and-Spoke"
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Site-to-Site"
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Dial-up User"
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "A"
    ],
    "tags": [
      "IPsec",
      "VPN Wizard",
      "Remote Access"
    ],
    "warnings": [],
    "domain": "vpn",
    "explanation": "**Conceito:** usuário móvel com FortiClient usa o template **Remote Access** do VPN Wizard.\n- ✅ A: Remote Access é para usuários remotos.\n- ❌ B: Hub-and-Spoke liga vários sites.\n- ❌ C: Site-to-Site liga dois gateways fixos.\n- ❌ D: não é um template do wizard na 7.6."
  },
  {
    "id": "q-90",
    "docNumber": 90,
    "origin": "questao 90 do documento \"dump_7.6 VERSAO_3\" = questao 91 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "Which two statements about the Security Fabric rating are true? (Choose two answers)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "A license is required to obtain an executive summary in the Security Rating section."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "The root FortiGate provides executive summaries of all the FortiGate devices in the Security Fabric."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "The Security Posture category provides PCI compliance results."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Security Rating Insights are available only in the Security Rating page."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "B"
    ],
    "tags": [
      "Security Fabric",
      "Security Rating"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** o Security Rating completo (com executive summary) exige licença e é visto no root do Fabric.\n- ✅ A: executive summary exige licença de Security Rating.\n- ✅ B: o root consolida o resumo de todos os FortiGates.\n- ❌ C: PCI fica em compliance, não em Security Posture.\n- ❌ D: os insights aparecem também em outras páginas (ex.: policies)."
  },
  {
    "id": "q-91",
    "docNumber": 91,
    "origin": "questao 91 do documento \"dump_7.6 VERSAO_3\" = questao 92 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "You are encountering connectivity problems caused by intermediate devices blocking IPsec traffic. In which two ways can you effectively resolve the problem? (Choose two answers)"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "You can use SSL VPN tunnel mode to prevent problems with blocked ESP and UDP ports (500 or 4500)."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "You can turn on fragmentation to fix large certificate negotiation problems."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "You can configure a hub-and-spoke topology with SSL VPN tunnels to bypass blocked UDP ports."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "You should use the protocol IKEv2."
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 2,
    "correctAnswers": [
      "A",
      "B"
    ],
    "tags": [
      "IPsec",
      "SSL VPN",
      "Fragmentation"
    ],
    "warnings": [],
    "domain": "vpn",
    "explanation": "**Conceito:** se ESP/UDP 500/4500 são bloqueados, troque para SSL (TCP) ou fragmente pacotes IKE grandes.\n- ✅ A: SSL VPN usa TCP/443 e passa onde IPsec é bloqueado.\n- ✅ B: fragmentação resolve certificados grandes descartados no caminho.\n- ❌ C: hub-and-spoke com SSL VPN não é uma topologia suportada para isso.\n- ❌ D: IKEv2 usa as mesmas portas, continua bloqueado."
  },
  {
    "id": "q-92",
    "docNumber": 92,
    "origin": "questao 92 do documento \"dump_7.6 VERSAO_3\" = questao 64 do site examtopics (drag and drop)",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "DRAG DROP An administrator wants to form an HA cluster using the FGCP protocol. Both FortiGate devices are configured with the set override enable command. Arrange the criteria in the order in which the FGCP protocol uses them to elect the primary FortiGate."
      },
      {
        "id": "b2",
        "type": "text",
        "content": "Arraste os critérios para as posições 1 a 4 (o primeiro critério avaliado fica na posição 1). Uma das caixas sobra."
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Connected monitored ports"
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Priority"
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "HA uptime"
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "FortiGate serial number"
      },
      {
        "id": "opt-E",
        "letter": "E",
        "text": "System uptime"
      }
    ],
    "isMultipleChoice": true,
    "requiredAnswersCount": 4,
    "correctAnswers": [
      "A",
      "B",
      "C",
      "D"
    ],
    "tags": [
      "HA",
      "FGCP",
      "Election"
    ],
    "warnings": [],
    "domain": "deployment_system",
    "explanation": "**Conceito:** com override enable, a priority é avaliada antes do HA uptime.\n- ✅ 1º Connected monitored ports: quem tem mais portas monitoradas ativas vence sempre.\n- ✅ 2º Priority: com override, o maior priority vence antes do uptime.\n- ✅ 3º HA uptime: desempate pelo tempo no cluster (diferença maior que 5 min).\n- ✅ 4º FortiGate serial number: desempate final, o maior serial vence.\n- ❌ System uptime: não entra na eleição FGCP; o que conta é o HA uptime.",
    "kind": "order"
  },
  {
    "id": "q-93",
    "docNumber": 93,
    "origin": "questao 93 do documento \"dump_7.6 VERSAO_3\" = questao 68 do site examtopics",
    "blocks": [
      {
        "id": "b1",
        "type": "text",
        "content": "You have implemented the application sensor and the corresponding firewall policy as shown in the exhibits."
      },
      {
        "id": "b2",
        "type": "image",
        "url": "exhibits/q93-1.png",
        "pending": false,
        "label": "Exhibit 1"
      },
      {
        "id": "b3",
        "type": "image",
        "url": "exhibits/q93-2.png",
        "pending": false,
        "label": "Exhibit 2"
      },
      {
        "id": "b4",
        "type": "text",
        "content": "You cannot access any of the Google applications, but you are able to access www.fortinet.com. What would you do to resolve this issue?"
      }
    ],
    "options": [
      {
        "id": "opt-A",
        "letter": "A",
        "text": "Change the Inspection mode to Proxy-based."
      },
      {
        "id": "opt-B",
        "letter": "B",
        "text": "Set SSL inspection to deep-content-inspection."
      },
      {
        "id": "opt-C",
        "letter": "C",
        "text": "Move up Google in the Application and Filter Overrides section to set its priority to 1."
      },
      {
        "id": "opt-D",
        "letter": "D",
        "text": "Add Google.com to the URL category in the security profile."
      }
    ],
    "isMultipleChoice": false,
    "requiredAnswersCount": 1,
    "correctAnswers": [
      "C"
    ],
    "tags": [
      "Application Control",
      "Overrides"
    ],
    "warnings": [],
    "domain": "content_inspection",
    "explanation": "**Conceito:** Application and Filter Overrides são avaliados de cima para baixo; o primeiro match vence.\n- ❌ A: o modo de inspeção não muda a ordem dos overrides.\n- ❌ B: a aplicação já é identificada, o problema é a ordem.\n- ✅ C: com o Google em prioridade 1, o Allow casa antes do bloqueio.\n- ❌ D: categoria de URL não resolve um bloqueio de application control."
  }
];
