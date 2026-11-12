import fs from 'fs';
import path from 'path';

// All 77 questions extracted verbatim from the attached dump_7.6_-_perguntas_Completo_V2_formatado.docx (pages 1 to 38)
const rawQuestions = [
  {
    docNumber: 1,
    origin: 'questao 1 do documento "NSE4_FGT_AD-7.6" = questao 38 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibit: FortiGate SD-WAN zone configuration GUI (SD-WAN Zones, SD-WAN Rules, Performance SLAs with Underlay and overlay zones)' },
      { id: 'b3', type: 'text', content: 'An SD-WAN zone configuration on the FortiGate GUI is shown. Based on the exhibit, which statement is true?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The Underlay zone contains no member.' },
      { id: 'opt-B', letter: 'B', text: 'The virtual-wan-link and overlay zones can be deleted.' },
      { id: 'opt-C', letter: 'C', text: 'The Underlay zone is the zone by default.' },
      { id: 'opt-D', letter: 'D', text: 'port2 and port3 are not assigned to a zone.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['SD-WAN', 'GUI']
  },
  {
    docNumber: 2,
    origin: 'questao 2 do documento "NSE4_FGT_AD-7.6" = questao 9 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'An administrator wants to configure dead peer detection (DPD) on IPsec VPN for detecting dead tunnels. The requirement is that FortiGate sends DPD probes only when there is no inbound traffic. Which DPD mode on FortiGate meets this requirement?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'On Demand' },
      { id: 'opt-B', letter: 'B', text: 'Enabled' },
      { id: 'opt-C', letter: 'C', text: 'On Idle' },
      { id: 'opt-D', letter: 'D', text: 'Disabled' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['IPsec', 'VPN', 'DPD']
  },
  {
    docNumber: 3,
    origin: 'questao 3 do documento "NSE4_FGT_AD-7.6" = questao 33 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'terminal', content: `FortiGate # diagnose debug rating
Locale : english
Service : Web-filter
Status : Enable
License : Contract
Num. Of servers : 1
Protocol : https
Port : 8888
Anycast : Disable
Default servers : Not included

-- Server List (Wed Sep 20 09:22:42 2023) --
IP: 10.0.1.241  Weight: -244  RTT: 2  Flags: I  TZ: 0  Fortiguard-requests: 122  Curr Lost: 0  Total Lost: 0  Updated Time: Wed Sep 20 09:21:55 2023` },
      { id: 'b3', type: 'text', content: 'Which two statements about the FortiGuard connection are true? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The weight increases as the number of failed packets rises.' },
      { id: 'opt-B', letter: 'B', text: 'You can configure unreliable protocols to communicate with FortiGuard Server.' },
      { id: 'opt-C', letter: 'C', text: 'FortiGate identified the FortiGuard Server using DNS lookup.' },
      { id: 'opt-D', letter: 'D', text: 'FortiGate is using the default port for FortiGuard communication.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['FortiGuard', 'CLI', 'Web Filter']
  },
  {
    docNumber: 4,
    origin: 'questao 4 do documento "NSE4_FGT_AD-7.6" = questao 12 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'What are two features of FortiGate FSSO agentless polling mode? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'FortiGate uses the AD server as the collector agent.' },
      { id: 'opt-B', letter: 'B', text: 'FortiGate uses the SMB protocol to read the event viewer logs from the DCs.' },
      { id: 'opt-C', letter: 'C', text: 'FortiGate does not support workstation check.' },
      { id: 'opt-D', letter: 'D', text: 'FortiGate directs the collector agent to use a remote LDAP server.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['FSSO', 'Authentication']
  },
  {
    docNumber: 5,
    origin: 'questao 5 do documento "NSE4_FGT_AD-7.6" = questao 36 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'An administrator wants to form an HA cluster using the FGCP protocol. Which two requirements must the administrator ensure both members fulfill? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'They must have the same hard drive configuration.' },
      { id: 'opt-B', letter: 'B', text: 'They must have the same number of configured VDOMs.' },
      { id: 'opt-C', letter: 'C', text: 'They must have the heartbeat interfaces in the same subnet.' },
      { id: 'opt-D', letter: 'D', text: 'They must have the same HA group ID.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['HA', 'FGCP']
  },
  {
    docNumber: 6,
    origin: 'questao 6 do documento "NSE4_FGT_AD-7.6" = questao 25 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibit: IPsec tunnel configuration (HQ-NGFW phase 2 ToBR1 vs BR1-FGT phase 2 ToHQ)' },
      { id: 'b3', type: 'text', content: 'A network administrator is troubleshooting an IPsec tunnel between two FortiGate devices. The administrator has determined that phase 1 status is up, but phase 2 fails to come up. Based on the phase 2 configuration shown in the exhibit, which two configuration changes will bring phase 2 up? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'On BR1-FGT, set Remote Address to 10.0.11.0/255.255.255.0.' },
      { id: 'opt-B', letter: 'B', text: 'On HQ-NGFW. enable Diffie-Hellman Group 2.' },
      { id: 'opt-C', letter: 'C', text: 'On BR1-FGT. set Seconds to 43200.' },
      { id: 'opt-D', letter: 'D', text: 'On HQ-NGFW. set Encryption to AES256.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['IPsec', 'VPN', 'Phase 2']
  },
  {
    docNumber: 7,
    origin: 'questao 7 do documento "NSE4_FGT_AD-7.6" = questao 27 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibit: Edit SSL/SSH Inspection Profile showing Server certificate SNI check set to Strict' },
      { id: 'b3', type: 'text', content: 'What would be the impact of these settings on the Server certificate SNI check configuration on FortiGate?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'FortiGate will accept and use the CN in the server certificate for URL filtering if the SNI does not match the CN or SAN fields.' },
      { id: 'opt-B', letter: 'B', text: 'FortiGate will accept the connection with a warning if the SNI does not match the CN or SAN fields.' },
      { id: 'opt-C', letter: 'C', text: 'FortiGate will close the connection if the SNI does not match the CN or SAN fields.' },
      { id: 'opt-D', letter: 'D', text: 'FortiGate will close the connection if the SNI does not match the CN and SAN fields.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['SSL/SSH Inspection', 'SNI', 'Certificate']
  },
  {
    docNumber: 8,
    origin: 'questao 8 do documento "NSE4_FGT_AD-7.6" = questao 21 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibits.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibits: Application sensor (Priority 1: Excessive-Bandwidth Block, Priority 2: Google Monitor) and Firewall policy (Proxy-based, certificate-inspection)' },
      { id: 'b3', type: 'text', content: 'You have implemented the application sensor and the corresponding firewall policy as shown in the exhibits. You cannot access any of the Google applications, but you are able to access www.fortinet.com. Which two actions would you take to resolve the issue? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Set SSL inspection to deep-content inspection.' },
      { id: 'opt-B', letter: 'B', text: 'Move up Google in the Application and Filter Overrides section to set its priority to 1.' },
      { id: 'opt-C', letter: 'C', text: 'Add "Google".com to the URL category in the security profile.' },
      { id: 'opt-D', letter: 'D', text: 'Change the Inspection mode to Flow-based.' },
      { id: 'opt-E', letter: 'E', text: 'Set the action for Google in the Application and Filter Overrides section to Allow.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['Application Control', 'Firewall Policy']
  },
  {
    docNumber: 9,
    origin: 'questao 9 do documento "NSE4_FGT_AD-7.6" = questao 44 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'terminal', content: `config system global
    set av-failopen one-shot
end
config ips global
    set fail-open enable
end` },
      { id: 'b3', type: 'text', content: 'Based on this partial configuration, what are the two possible outcomes when FortiGate enters conserve mode? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'FortiGate drops new sessions requiring inspection.' },
      { id: 'opt-B', letter: 'B', text: 'Administrators must restart FortiGate to allow new sessions.' },
      { id: 'opt-C', letter: 'C', text: 'Administrators cannot change the configuration.' },
      { id: 'opt-D', letter: 'D', text: 'FortiGate skips quarantine actions.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['Conserve Mode', 'CLI', 'IPS']
  },
  {
    docNumber: 10,
    origin: 'questao 10 do documento "NSE4_FGT_AD-7.6" = questao 40 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'An administrator has configured a dialup IPsec VPN on FortiGate with add-route enabled. However, the static route is not showing in the routing table. Which two statements about this scenario are correct? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The administrator must use a policy route instead of a static route for add-route to work properly.' },
      { id: 'opt-B', letter: 'B', text: 'The administrator must ensure phase 2 is successfully established.' },
      { id: 'opt-C', letter: 'C', text: 'The administrator must define the remote network correctly in the phase 2 selectors.' },
      { id: 'opt-D', letter: 'D', text: 'The administrator must enable a dynamic routing protocol on the dialup interface.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['IPsec', 'VPN', 'Routing']
  },
  {
    docNumber: 11,
    origin: 'questao 11 do documento "NSE4_FGT_AD-7.6" = questao 35 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibit: New RADIUS Server configuration (Name: FortiAuthenticator-RADIUS, Include in every user group enabled)' },
      { id: 'b3', type: 'text', content: 'An administrator added a configuration for a new RADIUS server While configuring, the administrator enabled Include in every user group What is the impact of enabling Include in every user group in a RADIUS configuration?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'This option places the RADIUS server, and all users who can authenticate against that server, into every FortiGate user group.' },
      { id: 'opt-B', letter: 'B', text: 'This option places all FortiGate and groups required to authenticate into the RADIUS server, which, in this case, is FortiAuthenticator.' },
      { id: 'opt-C', letter: 'C', text: 'This option places all users into every RADIUS user group, including groups that are used for the LDAP server on FortiGate.' },
      { id: 'opt-D', letter: 'D', text: 'This option places the RADIUS server, and all users who can authenticate against that server, into every RADIUS group.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['RADIUS', 'Authentication']
  },
  {
    docNumber: 12,
    origin: 'questao 12 do documento "NSE4_FGT_AD-7.6" = questao 8 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'You have created a web filter profile named restrictmedia-profile with a daily category usage quota. When you are adding the profile to the firewall policy, the restrictmedia-profile is not listed in the available web profile drop down. What could be the reason?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The web filter profile is already referenced in another firewall policy.' },
      { id: 'opt-B', letter: 'B', text: 'The firewall policy is in no-inspection mode instead of deep-inspection.' },
      { id: 'opt-C', letter: 'C', text: 'The naming convention used in the web filter profile is restricting it in the firewall policy.' },
      { id: 'opt-D', letter: 'D', text: 'The inspection mode in the firewall policy is not matching with web filter profile feature set.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['Web Filter', 'Firewall Policy']
  },
  {
    docNumber: 13,
    origin: '13. Refer to the exhibits.',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibits.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibits: Network diagram (PC1, PC2, PC3 behind FortiGate), Firewall policy, Dynamic IP Pool (One-to-One 100.65.0.110-100.65.0.111)' },
      { id: 'b3', type: 'text', content: 'A diagram of a FortiGate device connected to the network, as well as the firewall policy and IP pool configuration on the FortiGate device are shown. Two PCs. PC1 and PC2, are connected behind FortiGate and can access the internet successfully. However, when the administrator adds a third PC to the network (PC3), the PC cannot connect to the internet. Based on the information shown in the exhibit, which two configuration options can the administrator use to fix the connectivity issue for PC3? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'In the system settings, set Multiple Interface Policies to enable.' },
      { id: 'opt-B', letter: 'B', text: 'in the IP pool configuration, set end ip to 100.65.0.112.' },
      { id: 'opt-C', letter: 'C', text: 'In the firewall policy, set match-vip to enable using CLI.' },
      { id: 'opt-D', letter: 'D', text: 'In the IP pool configuration, set type to overload.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['NAT', 'IP Pool', 'Firewall Policy']
  },
  {
    docNumber: 14,
    origin: 'questao 14 do documento "NSE4_FGT_AD-7.6" = questao 41 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Which two statements are correct when the FortiGate device enters conserve mode? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'FortiGate refuses to accept configuration changes.' },
      { id: 'opt-B', letter: 'B', text: 'FortiGate halts complete system operation and requires a reboot to regain available resources.' },
      { id: 'opt-C', letter: 'C', text: 'FortiGate continues to transmit packets without IPS inspection when the fail-open global setting in IPS is enabled.' },
      { id: 'opt-D', letter: 'D', text: 'FortiGate continues to run critical security actions, such as quarantine.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['Conserve Mode', 'System']
  },
  {
    docNumber: 15,
    origin: 'questao 15 do documento "NSE4_FGT_AD-7.6" = questao 29 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'image', pending: true, label: 'Exhibits: FortiGate HA cluster topology, Current HA status CLI, New FortiGate HA configuration (HQ-NGFW-1 priority 90 override disable, HQ-NGFW-2 priority 110 override enable)' },
      { id: 'b2', type: 'text', content: 'Based on the current HA status, an administrator updates the override and priority parameters on HQ-NGFW-1 and HQ-NGFW-2 as shown in the exhibits. What would be the expected outcome in the HA cluster?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The HA cluster will become out of sync because the override setting must match on all HA members..' },
      { id: 'opt-B', letter: 'B', text: 'HQ-NGFW-1 will synchronize the override disable setting with HQ-NGFW-2.' },
      { id: 'opt-C', letter: 'C', text: 'HQ-NGFW-1 will remain the primary because HQ-NGFW-2 has lower priority.' },
      { id: 'opt-D', letter: 'D', text: 'HQ-NGFW-2 will take over as the primary because it has the override enable setting and Higher priority than HQ-NGFW-1.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['HA', 'FGCP', 'Failover']
  },
  {
    docNumber: 16,
    origin: 'questao 16 do documento "NSE4_FGT_AD-7.6" = questao 6 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibit: Firewall policy row (Source: HQ_SUBNET, Remote-users; Service: ALL_ICMP, HTTPS, HTTP; Action: ACCEPT; NAT: Standard)' },
      { id: 'b3', type: 'text', content: 'When attempting to access an external website using an active authentication method, the user is not presented with a login prompt. What is the most likely reason for this situation?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'No matching user account exists for this user.' },
      { id: 'opt-B', letter: 'B', text: 'The Remote-users group must be set up correctly in the FSSO configuration.' },
      { id: 'opt-C', letter: 'C', text: 'The Remote-users group is not added to the Destination.' },
      { id: 'opt-D', letter: 'D', text: 'The Service DNS is required in the firewall policy.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['Authentication', 'Firewall Policy']
  },
  {
    docNumber: 17,
    origin: 'questao 17 do documento "NSE4_FGT_AD-7.6" = questao 37 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'When configuring firewall policies which of the following is true regarding the policy ID? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'A policy ID cannot be modified once a policy is created.' },
      { id: 'opt-B', letter: 'B', text: 'A firewall policy ID identifies the order of policy execution in firewall policies.' },
      { id: 'opt-C', letter: 'C', text: 'It is mandatory to provide a policy ID while creating a firewall policy regardless of GUI or CLI.' },
      { id: 'opt-D', letter: 'D', text: 'You can create a policy in CLI with policy ID 0.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['Firewall Policy', 'CLI']
  },
  {
    docNumber: 18,
    origin: 'questao 18 do documento "NSE4_FGT_AD-7.6" = questao 39 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibits.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibits: Network diagram (HQ-PC-1 10.0.11.50 -> HQ-NGFW WAN 100.65.0.101 -> Router -> BR1-FGT 100.65.1.111), NAT IP pool configuration, Firewall policies' },
      { id: 'b3', type: 'text', content: 'The exhibits show a diagram of a FortiGate device connected to the network, as well as the IP pool configuration and firewall policy objects. The WAN (port2) interface has the IP address 100.65.0.101/24. The LAN (port4) interface has the IP address 10.0.11.254/24. Which IP address will be used to source NAT (SNAT) the traffic, if the user on HQ-PC-1 (10.0.11.50) pings the IP address of BR-FGT (100.65.1.111)?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: '100.65.0.101' },
      { id: 'opt-B', letter: 'B', text: '100.65.0.49' },
      { id: 'opt-C', letter: 'C', text: '100.65.0.149' },
      { id: 'opt-D', letter: 'D', text: '100.65.0.99' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['NAT', 'Firewall Policy', 'IP Pool']
  },
  {
    docNumber: 19,
    origin: 'questao 19 do documento "NSE4_FGT_AD-7.6" = questao 47 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'An administrator manages a FortiGate model that supports NTurbo. How does NTurbo acceleration enhance antivirus performance?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'For flow-based inspection. NTurbo establishes a dedicated data path to redirect traffic between the IPS engine and FortiGate ingress and egress interfaces.' },
      { id: 'opt-B', letter: 'B', text: 'For flow-based inspection. NTurbo creates two inspection sessions on the FortiGate device.' },
      { id: 'opt-C', letter: 'C', text: 'For proxy-based inspection. NTurbo offloads traffic to the content processor.' },
      { id: 'opt-D', letter: 'D', text: 'For proxy-based inspection. NTurbo buffers the whole file and then sends it to the antivirus engine.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['NTurbo', 'Antivirus', 'Hardware Acceleration']
  },
  {
    docNumber: 20,
    origin: 'questao 20 do documento "NSE4_FGT_AD-7.6" = questao 18 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'terminal', content: `HQ-NGFW-1 # diagnose test application ipsmonitor 1
pid = 2044, engine count = 0 (+1)
0 - pid:2074:2074 cfg:1 master:0 run:1` },
      { id: 'b3', type: 'text', content: 'As an administrator you have created an IPS profile, but it is not performing as expected. While testing you got the output as shown in the exhibit What could be the possible reason of the diagnose output shown in the exhibit?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'There is a no firewall policy configured with an IPS security profile.' },
      { id: 'opt-B', letter: 'B', text: 'Administrator entered the command diagnose test application ipsmonitor 5.' },
      { id: 'opt-C', letter: 'C', text: 'FortiGate entered into IPS fail open state.' },
      { id: 'opt-D', letter: 'D', text: 'Administrator entered the command diagnose test application ipsmonitor 99.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['IPS', 'CLI', 'Troubleshooting']
  },
  {
    docNumber: 21,
    origin: 'questao 21 do documento "NSE4_FGT_AD-7.6" = questao 13 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'terminal', content: `date=2025-09-03 time=09:09:57 id=7545895911432388608 itime="2025-09-03 09:10:02" euid=3 epid=3 dsteuid=3 dstepid=101 logflag=0 logver=706003401 type="utm" subtype="app-ctrl" level="warning" action="block" sessionid=510 policyid=1 srcip=10.0.11.50 dstip=54.146.230.62 srcport=53398 dstport=80 proto=6 logid=1059028705 service="HTTP" eventtime=1756915797391471958 incidentserialno=116391982 direction="outgoing" apprisk="elevated" appid=30220 srcintfrole="undefined" dstintfrole="undefined" applist="default" appcat="Video/Audio" app="ABC.Com" hostname="abc.go.com" url="/favicon.ico" eventtype="signature" srcintf="port4" dstintf="port2" msg="Video/Audio: ABC.Com" tz="-0700" policytype="policy" srccountry="Reserved" dstcountry="United States" poluuid="b11ac58c-791b-51e7-4600-12f829a689d9" agent="Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0" httpmethod="GET" referralurl="http://abc.go.com/" devid="FGVM02TM24013423" vd="root" dtime="2025-09-03 09:09:57" itime_t=1756915802 devname="HQ-NGFW-1"` },
      { id: 'b3', type: 'text', content: 'Which two ways can you view the log messages shown in the exhibit? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'By right clicking the implicit deny policy.' },
      { id: 'opt-B', letter: 'B', text: 'Using the FortiGate CLI command diagnose log test.' },
      { id: 'opt-C', letter: 'C', text: 'By filtering by policy universally unique identifier (UUID) and application name in the log entry.' },
      { id: 'opt-D', letter: 'D', text: 'In the Forward Traffic section.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['Logs', 'Application Control']
  },
  {
    docNumber: 22,
    origin: '22. Refer to the exhibit. questao 26 do site examtopics',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibit: SD-WAN traffic logs table showing Application Name, Result, Policy ID 1 (DIA), Destination Interface, SD-WAN Quality and SD-WAN Rule Name (blank)' },
      { id: 'b3', type: 'text', content: 'The administrator configured SD-WAN rules and set the FortiGate traffic log page to display SD-WANspecific columns: SD-WAN Quality and SD-WAN Rule Name. FortiGate allows the traffic according to policy ID 1 placed at the top. This is the policy that allows SDWAN traffic. Despite these settings, the traffic logs do not show the name of the SD-WAN rule used to steer those traffic flows. What could be the reason?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'SD-WAN rule names do not appear immediately. The administrator must refresh the page.' },
      { id: 'opt-B', letter: 'B', text: 'There is no application control profile applied to the firewall policy.' },
      { id: 'opt-C', letter: 'C', text: 'Destinations in the SD-WAN rules are configured for each application, but feature visibility is not enabled.' },
      { id: 'opt-D', letter: 'D', text: 'FortiGate load balanced the traffic according to the implicit SD-WAN rule.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['SD-WAN', 'Logs', 'Troubleshooting']
  },
  {
    docNumber: 23,
    origin: 'questao 23 do documento "NSE4_FGT_AD-7.6" = questao 42 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibits.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibits: Network diagram, VIP object configuration (External 100.65.0.200 -> Map to 10.0.11.50, Port Forwarding 443 -> 4443), Firewall policies' },
      { id: 'b3', type: 'text', content: `A diagram of a FortiGate device connected to the network VIP object and firewall policy configurations are shown.
The WAN (port2) interface has the IP address 100.65.0.101/24.
The LAN (port4) interface has the IP address 10.0.11.254/24.
If the host 100.65.1.111 sends a TCP SYN packet on port 443 to 100.65.0.200. what will the source address, destination address, and destination port of the packet be at the time FortiGate forwards the packet to the destination?` }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: '10.0.11.254, 100.65.0.200. and 443, respectively' },
      { id: 'opt-B', letter: 'B', text: '10.0.11.254, 10.0.15.50, and 4443. respectively' },
      { id: 'opt-C', letter: 'C', text: '100.65.1.111, 10.0.11.50, and 4443. respectively' },
      { id: 'opt-D', letter: 'D', text: '100.65.1.111, 10.0.11.50. and 443. respectively' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['VIP', 'DNAT', 'Firewall Policy']
  },
  {
    docNumber: 24,
    origin: 'questao 24 do documento "NSE4_FGT_AD-7.6" = questao 7 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'A network administrator is reviewing firewall policies in both Interface Pair View and By Sequence View. The policies appear in a different order in each view. Why is the policy order different in these two views?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'By Sequence View groups policies based on rule priority, while Interface Pair View always follows the order of traffic logs.' },
      { id: 'opt-B', letter: 'B', text: 'The firewall dynamically reorders policies in Interface Pair View based on recent traffic patterns, but By Sequence View remains static.' },
      { id: 'opt-C', letter: 'C', text: 'Interface Pair View sorts policies based on matching interfaces, while By Sequence View shows the actual processing order of rules.' },
      { id: 'opt-D', letter: 'D', text: 'Policies in Interface Pair View are prioritized by security levels, while By Sequence View strictly follows the administrator\'s manual ordering.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['Firewall Policy', 'GUI']
  },
  {
    docNumber: 25,
    origin: 'questao 25 do documento "NSE4_FGT_AD-7.6" = questao 31 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'A new administrator is configuring FSSO authentication on FortiGate using DC Agent Mode. Which step is not part of the expected process?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The DC agent sends login event data directly to FortiGate.' },
      { id: 'opt-B', letter: 'B', text: 'FortiGate determines user identity based on the IP address in the FSSO list.' },
      { id: 'opt-C', letter: 'C', text: 'The collector agent forwards login event data to FortiGate.' },
      { id: 'opt-D', letter: 'D', text: 'The user logs into the windows domain.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['FSSO', 'Authentication']
  },
  {
    docNumber: 26,
    origin: 'questao 26 do documento "NSE4_FGT_AD-7.6" = questao 46 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Which statement correctly describes NetAPI polling mode for the FSSO collector agent?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The collector agent uses a Windows API to query DCs for user logins.' },
      { id: 'opt-B', letter: 'B', text: 'The NetSessionEnum function is used to track user logouts.' },
      { id: 'opt-C', letter: 'C', text: 'NetAPI polling can increase bandwidth usage in large networks.' },
      { id: 'opt-D', letter: 'D', text: 'The collector agent must search Windows application event logs.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['FSSO', 'NetAPI']
  },
  {
    docNumber: 27,
    origin: 'questao 27 do documento "NSE4_FGT_AD-7.6" = questao 22 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'terminal', content: `HA configuration:
HQ-NGFW-1 # config system ha
HQ-NGFW-1 (ha) # show
config system ha
    set group-id 5
    set group-name "Training"
    set mode a-p
    set password ENC a4fbyqY4iPexFmAnZgzDY
    set hbdev "port7" 0
    set session-pickup enable
    set override disable
    set priority 200
    set monitor "port1"
    set memory-based-failover enable
    set memory-failover-threshold 70
    set memory-failover-monitor-period 50
    set memory-failover-sample-rate 10
    set memory-failover-flip-timeout 60
end

HQ-NGFW-1 System Performance output:
Memory: 2042076k total, 1837868k used (90%), 104146k free (5.1%), 100062k freeable (4.9%)

HQ-NGFW-2 System Performance output:
Memory: 2042076k total, 993836k used (48.7%), 690352k free (33.8%), 357888k freeable (17.5%)` },
      { id: 'b3', type: 'text', content: 'An administrator has observed HA cluster performance status for 55 seconds. Which FortiGate is the primary?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'HQ-NGFW-1 with the parameter memory-failover-flip-timeout setting.' },
      { id: 'opt-B', letter: 'B', text: 'HQ-NGFW-2 with the parameter priority setting.' },
      { id: 'opt-C', letter: 'C', text: 'HQ-NGFW-1 with the parameter override setting.' },
      { id: 'opt-D', letter: 'D', text: 'HQ-NGFW-2 with the parameter memory-failover-threshold setting.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['HA', 'FGCP', 'Failover']
  },
  {
    docNumber: 28,
    origin: '28. Refer to the exhibit. A partial cloud topology is shown.',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit. A partial cloud topology is shown.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibit: AWS Region topology showing FortiGate CNF Instance, GWLB, GWLBe in Customer VPC, EC2, Internet Gateway' },
      { id: 'b3', type: 'text', content: 'You deployed a FortiGate Cloud-Native Firewall (CNF) in AWS. During the deployment, which components must the FortiGate CNF create to handle traffic from the EC2 instance?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The customer VPC and GWLBe.' },
      { id: 'opt-B', letter: 'B', text: 'The gateway load balancer endpoint (GWLBe) in the customer virtual private cloud (VPC).' },
      { id: 'opt-C', letter: 'C', text: 'The CNF VPC. customer VPC. and GWLB.' },
      { id: 'opt-D', letter: 'D', text: 'The GWLB. GWLBe, and the internet gateway (IGW) in the customer VPC.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['Cloud', 'AWS', 'FortiGate CNF']
  },
  {
    docNumber: 29,
    origin: 'questao 29 do documento "NSE4_FGT_AD-7.6" = questao 45 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'image', pending: true, label: 'Exhibit: Application and Filter Overrides (Priority 1: Details ABC.Com, Type Application, Action Allow; Priority 2: Excessive-Bandwidth, Type Filter, Action Block)' },
      { id: 'b2', type: 'text', content: 'An administrator has configured an Application Overrides for the ABC.Com application signature and set the Action to Allow This application control profile is then applied to a firewall policy that is scanning all outbound traffic. Logging is enabled in the firewall policy. To test the configuration, the administrator accessed the ABC.Com web site several times. Why are there no logs generated under security logs for ABC.Com?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The ABC Com is hitting the category Excessive-Bandwidth.' },
      { id: 'opt-B', letter: 'B', text: 'The ABC.Com is configured under application profile, which must be configured as a web filter profile.' },
      { id: 'opt-C', letter: 'C', text: 'The ABC.Com Type is set as Application instead of Filter.' },
      { id: 'opt-D', letter: 'D', text: 'The ABC.Com Action is set to Allow.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['Application Control', 'Logging']
  },
  {
    docNumber: 30,
    origin: 'questao 30 do documento "NSE4_FGT_AD-7.6" = questao 19 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'terminal', content: `System Performance output:
Memory: 2042076k total, 1837868k used (90%), 104146k free (5.1%), 100062k freeable (4.9%)

Memory usage threshold settings:
config system global
    set memory-use-threshold-extreme 89
    set memory-use-threshold-green 82
    set memory-use-threshold-red 88
end` },
      { id: 'b2', type: 'text', content: 'The system performance output and default configuration of high memory usage thresholds on a FortiGate device are shown. Based on the system performance output, what are the two possible outcomes? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Administrators can access only through the console port.' },
      { id: 'opt-B', letter: 'B', text: 'FortiGate has entered conserve mode.' },
      { id: 'opt-C', letter: 'C', text: 'FortiGate drops new sessions.' },
      { id: 'opt-D', letter: 'D', text: 'Administrators can change the configuration.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['Conserve Mode', 'CLI', 'System Performance']
  },
  {
    docNumber: 31,
    origin: 'questao 31 do documento "NSE4_FGT_AD-7.6" = questao 48 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'An administrator wanted to configure an IPS sensor to block traffic that triggers the signature set number of times during a specific time period. How can the administrator achieve the objective?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Use IPS group signatures, set rate-mode 60.' },
      { id: 'opt-B', letter: 'B', text: 'Use IPS packet logging option with periodical filter option.' },
      { id: 'opt-C', letter: 'C', text: 'Use IPS signatures, rate-mode periodical option.' },
      { id: 'opt-D', letter: 'D', text: 'Use IPS filter, rate-mode periodical option.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['IPS', 'Rate-based']
  },
  {
    docNumber: 32,
    origin: 'questao 32 do documento "NSE4_FGT_AD-7.6" = questao 24 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Which two components are part of the secure internet access (SIA) agent-based mode on FortiSASE? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'FortiSASE Firewall-as-a-Service (FWaaS).' },
      { id: 'opt-B', letter: 'B', text: 'The proxy auto-configuration (PAC) file.' },
      { id: 'opt-C', letter: 'C', text: 'VPN policies.' },
      { id: 'opt-D', letter: 'D', text: 'FortiExtender.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['FortiSASE', 'SIA']
  },
  {
    docNumber: 33,
    origin: 'questao 33 do documento "NSE4_FGT_AD-7.6" = questao 10 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'image', pending: true, label: 'Exhibits: Application sensor (Overrides: Excessive-Bandwidth Block, Google Monitor) and Firewall policy (Flow-based, deep-inspection, Log allowed traffic All sessions)' },
      { id: 'b2', type: 'text', content: 'Refer to the application sensor and firewall policy exhibits. Which two factors can you observe? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'YouTube access is blocked based on Excessive-Bandwidth Application and Filter override settings.' },
      { id: 'opt-B', letter: 'B', text: 'Facebook access is blocked based on the category filter settings.' },
      { id: 'opt-C', letter: 'C', text: 'Facebook access is allowed but you cannot play Facebook videos based on Video/Audio category filter settings.' },
      { id: 'opt-D', letter: 'D', text: 'YouTube search is allowed based on the Google Application and Filter override settings.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['Application Control', 'Firewall Policy']
  },
  {
    docNumber: 34,
    origin: 'questao 34 do documento "NSE4_FGT_AD-7.6" = questao 3 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Which three statements about SD-WAN performance SLAs are true? (Choose three.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'They rely on session loss and jitter.' },
      { id: 'opt-B', letter: 'B', text: 'They monitor the state of the FortiGate device.' },
      { id: 'opt-C', letter: 'C', text: 'All the SLA targets can be configured.' },
      { id: 'opt-D', letter: 'D', text: 'They can be measured actively or passively.' },
      { id: 'opt-E', letter: 'E', text: 'They are applied in a SD-WAN rule lowest cost strategy.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 3,
    correctAnswers: [],
    tags: ['SD-WAN', 'Performance SLA']
  },
  {
    docNumber: 35,
    origin: 'questao 35 do documento "NSE4_FGT_AD-7.6" = questao 32 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'image', pending: true, label: 'Exhibit: Profile Name table showing Monitoring_Access, NOC_Access, prof_admin, super_admin' },
      { id: 'b2', type: 'text', content: 'The NOC team connects to the FortiGate GUI with the NOC_Access admin profile. They request that their GUI sessions do not disconnect too early during inactivity. What must the administrator configure to answer this specific request from the NOC team?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Increase the admintimeout value under config system accprofile noc Access.' },
      { id: 'opt-B', letter: 'B', text: 'increase the offline value of the override idle Timeout parameter in the NOC_Access admin profile.' },
      { id: 'opt-C', letter: 'C', text: 'Move NOC_Access to the top of the list to ensure all profile settings take effect.' },
      { id: 'opt-D', letter: 'D', text: 'Ensure that all NOC_Access users are assigned the super_admin role to guarantee access.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['Administrator', 'Profile', 'GUI']
  },
  {
    docNumber: 36,
    origin: 'questao 36 do documento "NSE4_FGT_AD-7.6" = questao 1 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: `The FortiGate device HQ-NGFW-1 with the IP address 10.0.13.254 sends logs to the FortiAnalyzer device with the IP address 10.0.13.125. The administrator wants to verify that reliable logging is enabled on HQ-NGFW-1. Which exhibit helps with the verification?` },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibits: A (diagnose sniffer packet), B (config log fortianalyzer setting), C (FortiAnalyzer GUI), D (FortiAnalyzer GUI)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'A .' },
      { id: 'opt-B', letter: 'B', text: 'B.' },
      { id: 'opt-C', letter: 'C', text: 'C.' },
      { id: 'opt-D', letter: 'D', text: 'D.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['FortiAnalyzer', 'Logging', 'CLI']
  },
  {
    docNumber: 37,
    origin: 'questao 37 do documento "NSE4_FGT_AD-7.6" = questao 11 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'image', pending: true, label: 'Exhibit: Exempt from SSL Inspection (Reputable websites, Web categories: Finance and Banking, Health and Wellness; Addresses: adobe, android, apple, appstore)' },
      { id: 'b2', type: 'text', content: 'The predefined deep-inspection and custom-deep-inspection profiles exclude some web categories from SSL inspection, as shown in the exhibit For which two reasons are these web categories exempted? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The resources utilization is optimized because these websites are in the trusted domain list on FortiGate.' },
      { id: 'opt-B', letter: 'B', text: 'The legal regulation aims to prioritize user privacy and protect sensitive information for these websites.' },
      { id: 'opt-C', letter: 'C', text: 'These websites are in an allowlist of reputable domain names maintained by FortiGuard.' },
      { id: 'opt-D', letter: 'D', text: 'The FortiGate temporary certificate denies the browser\'s access to websites that use HTTP Strict Transport Security.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['SSL Inspection', 'Certificate']
  },
  {
    docNumber: 38,
    origin: 'questao 38 do documento "NSE4_FGT_AD-7.6" = questao 43 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'image', pending: true, label: 'Exhibit: New AntiVirus Profile (Name: FTP_AV_Profile, AntiVirus scan toggle grayed out, Feature set Flow-based, Inspected Protocols all off)' },
      { id: 'b2', type: 'text', content: 'Why is the Antivirus scan switch grayed out when creating a new antivirus profile for FTP?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Antivirus scan is disabled under System -> Feature visibility.' },
      { id: 'opt-B', letter: 'B', text: 'None of the inspected protocols are active in this profile.' },
      { id: 'opt-C', letter: 'C', text: 'The Feature Set for the profile is Flow-based but it must be Proxy-based.' },
      { id: 'opt-D', letter: 'D', text: 'FortiGate with less than 2 GB RAM. does not support the Antivirus scan feature.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['Antivirus', 'Profile', 'GUI']
  },
  {
    docNumber: 39,
    origin: 'questao 39 do documento "NSE4_FGT_AD-7.6" = questao 16 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'FortiGate is integrated with FortiAnalyzer and FortiManager. When creating a firewall policy, which attribute must an administrator include to enhance functionality and enable log recording on FortiAnalyzer and FortiManager?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Universally Unique Identifier.' },
      { id: 'opt-B', letter: 'B', text: 'Policy ID.' },
      { id: 'opt-C', letter: 'C', text: 'Sequence ID.' },
      { id: 'opt-D', letter: 'D', text: 'Log ID.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['FortiAnalyzer', 'FortiManager', 'Firewall Policy']
  },
  {
    docNumber: 40,
    origin: 'questao 40 do documento "NSE4_FGT_AD-7.6" = questao 34 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'How does FortiExtender connect to FortiSASE in a site-based, remote internet access method?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'FortiExtender establishes a secure SSL connection using FortiClient.' },
      { id: 'opt-B', letter: 'B', text: 'FortiExtender uses the proxy auto-configuration.' },
      { id: 'opt-C', letter: 'C', text: 'FortiExtender first connects to a FortiGate LAN extension through a secure web gateway (SWG).' },
      { id: 'opt-D', letter: 'D', text: 'FortiExtender uses a Virtual Extensible LAN (VXLAN)-over-IPsec connection.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['FortiExtender', 'FortiSASE']
  },
  {
    docNumber: 41,
    origin: 'questao 41 do documento "NSE4_FGT_AD-7.6" = questao 30 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'What are two features of collector agent advanced mode? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'In advanced mode, security profiles can be applied only to user groups, not individual users.' },
      { id: 'opt-B', letter: 'B', text: 'In advanced mode. FortiGate can be configured as an LDAP client and group filters can be configured on FortiGate.' },
      { id: 'opt-C', letter: 'C', text: 'Advanced mode uses the Windows convention—NetBios: Domain\\Username.' },
      { id: 'opt-D', letter: 'D', text: 'Advanced mode supports nested or inherited groups.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['FSSO', 'Collector Agent']
  },
  {
    docNumber: 42,
    origin: 'questao 42 do documento "NSE4_FGT_AD-7.6" = questao 15 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'You have configured the below commands on a FortiGate' },
      { id: 'b2', type: 'terminal', content: `config system settings
    set strict-src-check enable
end

config system interface
    edit port1
        set src-check disable
    next
end` },
      { id: 'b3', type: 'text', content: 'What would be the impact of this configuration on FortiGate?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'FortiGate will enable strict RPF on all its interfaces and porti will be enable for asymmetric routing.' },
      { id: 'opt-B', letter: 'B', text: 'Port1 will be enabled with flexible RPF. and all other interfaces will be enabled for strict RPF.' },
      { id: 'opt-C', letter: 'C', text: 'FortiGate will enable strict RPF on all its interfaces and port1 will be exempted from RPF checks.' },
      { id: 'opt-D', letter: 'D', text: 'The global configuration will take precedence and FortiGate will enable strict RPF on all interfaces.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['RPF', 'CLI', 'Routing']
  },
  {
    docNumber: 43,
    origin: 'questao 43 do documento "NSE4_FGT_AD-7.6" = questao 23 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'A routing table is shown.' },
      { id: 'b2', type: 'terminal', content: `Routing Table:
10.0.11.0/24   0.0.0.0         port4    Distance 0  Metric 0  Priority 0  Connected
10.0.12.0/24   0.0.0.0         port5    Distance 0  Metric 0  Priority 0  Connected
10.0.13.0/24   0.0.0.0         port6    Distance 0  Metric 0  Priority 0  Connected
100.65.0.0/24  0.0.0.0         port2    Distance 0  Metric 0  Priority 0  Connected
100.66.0.0/24  0.0.0.0         port3    Distance 0  Metric 0  Priority 0  Connected
172.20.1.0/24  100.66.0.254    port3    Distance 9  Metric 0  Priority 2  Static
192.168.0.0/16 0.0.0.0         port1    Distance 0  Metric 0  Priority 0  Connected` },
      { id: 'b3', type: 'text', content: 'An administrator wants to create a new static route so the traffic to the subnet 172.20.1.0/24 is routed through port2 only. What are the two criteria that the administrator can use to achieve this objective? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The new static route must have the priority set to 3.' },
      { id: 'opt-B', letter: 'B', text: 'The new static route must have the metric set to 1.' },
      { id: 'opt-C', letter: 'C', text: 'The existing static route through port3 must have the distance set to 11.' },
      { id: 'opt-D', letter: 'D', text: 'The new static route must have the distance set to 9.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['Routing', 'Static Route']
  },
  {
    docNumber: 44,
    origin: 'questao 44 do documento "NSE4_FGT_AD-7.6" = questao 49 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: `There are multiple dialup IPsec VPNs configured in aggressive mode on the HQ FortiGate. The requirement is to connect dial-up users to their respective department VPN tunnels.
Which phase 1 setting you can configure to match the user to the tunnel?` }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Local Gateway.' },
      { id: 'opt-B', letter: 'B', text: 'Dead Peer Detection.' },
      { id: 'opt-C', letter: 'C', text: 'Peer ID.' },
      { id: 'opt-D', letter: 'D', text: 'IKE Mode Config.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['IPsec', 'VPN', 'Phase 1']
  },
  {
    docNumber: 45,
    origin: 'questao 45 do documento "NSE4_FGT_AD-7.6" = questao 5 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: `A network administrator has enabled full SSL inspection and web filtering on FortiGate. When visiting any HTTPS websites, the browser reports certificate warning errors. When visiting HTTP websites, the browser does not report errors.
What is the reason for the certificate warning errors?` }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The option invalid SSL certificates is set to allow on the SSL/SSH inspection profile.' },
      { id: 'opt-B', letter: 'B', text: 'The matching firewall policy is set to proxy inspection mode.' },
      { id: 'opt-C', letter: 'C', text: 'The browser does not trust the certificate used by FortiGate for SSL inspection.' },
      { id: 'opt-D', letter: 'D', text: 'The certificate used by FortiGate for SSL inspection does not contain the required certificate extensions.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['SSL Inspection', 'Certificate']
  },
  {
    docNumber: 46,
    origin: 'questao 46 do documento "NSE4_FGT_AD-7.6" = questao 17 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: `You have configured an application control profile, set peer-to-peer traffic to Block under the Categories tab. and applied it to the firewall policy. However, your peer-to-peer traffic on known ports is passing through the FortiGate without being blocked.
What FortiGate settings should you check to resolve this issue?` }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'FortiGuard category ratings.' },
      { id: 'opt-B', letter: 'B', text: 'Network Protocol Enforcement.' },
      { id: 'opt-C', letter: 'C', text: 'Replacement Messages for UDP-based Applications.' },
      { id: 'opt-D', letter: 'D', text: 'Application and Filter Overrides.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['Application Control', 'P2P']
  },
  {
    docNumber: 47,
    origin: 'questao 47 do documento "NSE4_FGT_AD-7.6" = questao 20 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'What are two characteristics of HA cluster heartbeat IP addresses in a FortiGate device? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Heartbeat IP addresses are used to distinguish between cluster members.' },
      { id: 'opt-B', letter: 'B', text: 'The heartbeat interface of the primary device in the cluster is always assigned IP address 169.254.0.1.' },
      { id: 'opt-C', letter: 'C', text: 'A change in the heartbeat IP address happens when a FortiGate device joins or leaves the cluster.' },
      { id: 'opt-D', letter: 'D', text: 'Heartbeat interfaces have virtual IP addresses that are manually assigned.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['HA', 'Heartbeat', 'FGCP']
  },
  {
    docNumber: 48,
    origin: 'questao 48 do documento "NSE4_FGT_AD-7.6" = questao 2 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'terminal', content: `Routing Table:
Destination       Gateway IP      Interface   Status
0.0.0.0/0         100.65.0.254    port2       Enabled
10.10.10.0/24     100.66.0.254    port3       Enabled
10.0.13.0/24      10.0.13.125     port6       Enabled` },
      { id: 'b2', type: 'text', content: 'Based on the routing table shown in the exhibit, which two statements are true? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'A packet with the source IP address 10.0.13.10 arriving on port2 is allowed if strict RPF is disabled.' },
      { id: 'opt-B', letter: 'B', text: 'A packet with the source IP address 10.100.110.10 arriving on port2 is allowed if strict RPF is enabled.' },
      { id: 'opt-C', letter: 'C', text: 'A packet with the source IP address 10.100.110.10 arriving on port3 is allowed if strict RPF is disabled.' },
      { id: 'opt-D', letter: 'D', text: 'A packet with the source IP address 10.10.10.10 arriving on port2 is allowed if strict RPF is enabled.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['RPF', 'Routing']
  },
  {
    docNumber: 49,
    origin: 'questao 49 do documento "NSE4_FGT_AD-7.6" = questao 4 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'FortiGate is operating in NAT mode and has two physical interfaces connected to the LAN and DMZ networks respectively. Which two statements about the requirements of connected physical interfaces on FortiGate are true? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Both interfaces must have DHCP enabled and interfaces set to LAN and DMZ roles assigned.' },
      { id: 'opt-B', letter: 'B', text: 'Both interfaces must have the interface role assigned.' },
      { id: 'opt-C', letter: 'C', text: 'Both interfaces must have directly connected routes on the routing table.' },
      { id: 'opt-D', letter: 'D', text: 'Both interfaces must have IP addresses assigned.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['Interfaces', 'NAT Mode']
  },
  {
    docNumber: 50,
    origin: 'questao 50 do documento "NSE4_FGT_AD-7.6" = questao 28 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'image', pending: true, label: 'Exhibits: Web filter profile (Static URL Filter: www.facebook.com Simple Monitor Enable), Firewall policy (Inspection mode Flow-based), FortiGuard Web Page Blocked (Malicious Websites)' },
      { id: 'b2', type: 'text', content: 'A web filter profile configuration and firewall policy configuration are shown. You are trying to access www.facebook.com, but you are redirected to a FortiGuard web filtering block page. Based on the exhibits, what is the possible cause of the issue?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The web rating override configuration is incorrect.' },
      { id: 'opt-B', letter: 'B', text: 'The web filter profile feature set is configured incorrectly.' },
      { id: 'opt-C', letter: 'C', text: 'The firewall policy inspection mode is incorrect.' },
      { id: 'opt-D', letter: 'D', text: 'For www.facebook.com the URL filter action is incorrect.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['Web Filter', 'Firewall Policy']
  },
  {
    docNumber: 51,
    origin: 'questao 51 do documento "NSE4_FGT_AD-7.6" = questao 65 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Exhibit' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibits: Application sensor configuration (Overrides Priority 1: Excessive-Bandwidth Block, Priority 2: Apple Monitor) and FaceTime details' },
      { id: 'b3', type: 'text', content: 'The exhibits show the application sensor configuration and the Excessive-Bandwidth and Apple filter details. Based on the configuration, what will happen to Apple FaceTime if there are only a few calls originating or incoming? (Choose one answer)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Apple FaceTime will be allowed, based on the Video/Audio category configuration.' },
      { id: 'opt-B', letter: 'B', text: 'Apple FaceTime will be blocked, based on the Excessive-Bandwidth filter configuration.' },
      { id: 'opt-C', letter: 'C', text: 'Apple FaceTime will be allowed, based on the Apple filter configuration.' },
      { id: 'opt-D', letter: 'D', text: 'Apple FaceTime will be allowed only if the Apple filter in Application and Filter Overrides is set to Allow.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['Application Control', 'Overrides']
  },
  {
    docNumber: 52,
    origin: 'questao 52 do documento "NSE4_FGT_AD-7.6" = questao 54 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Which two statements are true about an HA cluster? (Choose two answers)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'An HA cluster cannot have both in-band and out-of-band management interfaces at the same time.' },
      { id: 'opt-B', letter: 'B', text: 'Link failover triggers a failover if the administrator sets the interface down on the primary device.' },
      { id: 'opt-C', letter: 'C', text: 'When sniffing the heartbeat interface, the administrator must see the IP address 169.254.0.2.' },
      { id: 'opt-D', letter: 'D', text: 'HA incremental synchronization includes FIB entries and IPsec SAs.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['HA', 'FGCP']
  },
  {
    docNumber: 53,
    origin: '53.',
    blocks: [
      { id: 'b1', type: 'text', content: 'Which two statements describe characteristics of automation stitches? (Choose two answers)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Actions involve only devices included in the Security Fabric.' },
      { id: 'opt-B', letter: 'B', text: 'An automation stitch can have multiple triggers.' },
      { id: 'opt-C', letter: 'C', text: 'Multiple actions can run in parallel.' },
      { id: 'opt-D', letter: 'D', text: 'Triggers can involve external connectors.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['Automation Stitches', 'Security Fabric']
  },
  {
    docNumber: 54,
    origin: 'questao 54 do documento "NSE4_FGT_AD-7.6" = questao 55 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Which three strategies are valid SD-WAN rule strategies for member selection? (Choose three answers)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Lowest Cost (SLA) without load balancing.' },
      { id: 'opt-B', letter: 'B', text: 'Manual with load balancing.' },
      { id: 'opt-C', letter: 'C', text: 'Lowest Quality (SLA) with load balancing.' },
      { id: 'opt-D', letter: 'D', text: 'Lowest Cost (SLA) with load balancing.' },
      { id: 'opt-E', letter: 'E', text: 'Best Quality with load balancing.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 3,
    correctAnswers: [],
    tags: ['SD-WAN', 'Strategies']
  },
  {
    docNumber: 55,
    origin: '55. Refer to the exhibit showing a debug flow output.',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit showing a debug flow output.' },
      { id: 'b2', type: 'terminal', content: `Debug Flow output:
vd-root:0 received a packet(proto=1, 10.0.11.50:3->100.65.0.254:2048) tun_id=0.0.0.0 from port4. type=8, code=0, id=3, seq=5.
allocate a new session-00000721
in-[port4], out-[]
len=0
result: skb_flags-02000000, vid-0, ret-no-match, act-accept, flag-00000000
find a route: flag=00000000 gw-0.0.0.0 via port2
in-[port4], out-[port2], skb_flags-02000000, vid-0, app_id: 0, url_cat_id: 0
gnum-100004, use addr/intf hash, len=3
checked gnum-100004 policy-2, ret-matched, act-accept
ret-matched
gnum-4e20, check-fffffffa002c9c7
checked gnum-4e20 check, result: ret-no-match, act-drop
policy-2 is matched, act-drop
after iprope_captive_check(): is_captive=0, ret-matched, act-drop, idx-2
Denied by forward policy check (policy 2)` },
      { id: 'b3', type: 'text', content: 'Which two conclusions can you make from the debug flow output? (Choose two answers)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Default gateway is configured on port2.' },
      { id: 'opt-B', letter: 'B', text: 'The RPF check fails.' },
      { id: 'opt-C', letter: 'C', text: 'The Debug flow is for UDP traffic.' },
      { id: 'opt-D', letter: 'D', text: 'The Matching firewall policy denies the traffic.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['Debug Flow', 'CLI', 'Troubleshooting']
  },
  {
    docNumber: 56,
    origin: '56. Which three statements explain a flow-based antivirus profile? (Choose three answers)',
    blocks: [
      { id: 'b1', type: 'text', content: 'Which three statements explain a flow-based antivirus profile? (Choose three answers)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'FortiGate buffers the whole file but transmits to the client at the same time.' },
      { id: 'opt-B', letter: 'B', text: 'Flow-based inspection uses a hybrid of the scanning modes available in proxy-based inspection.' },
      { id: 'opt-C', letter: 'C', text: 'If a virus is detected, the last packet is delivered to the client.' },
      { id: 'opt-D', letter: 'D', text: 'Flow-based inspection optimizes performance compared to proxy-based inspection.' },
      { id: 'opt-E', letter: 'E', text: 'The IPS engine handles the process as a standalone.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 3,
    correctAnswers: [],
    tags: ['Antivirus', 'Flow-based']
  },
  {
    docNumber: 57,
    origin: '57. Refer to the exhibits.',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibits.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibits: Security Fabric logical topology view (HQ-NGFW-1 Fabric Root, FortiAnalyzer, HQ-ISFW) and Security Fabric settings on HQ-ISFW-2 (Status Pending)' },
      { id: 'b3', type: 'text', content: 'An administrator wants to add HQ-ISFW-2 in the Security Fabric. HQ-ISFW-2 is in the same subnet as HQ-ISFW. After configuring the Security Fabric settings on HQ-ISFW-2, the status stays Pending. What can be the two possible reasons? (Choose two answers)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Upstream FortiGate IP must be set to 10.0.11.254.' },
      { id: 'opt-B', letter: 'B', text: 'SAML Single Sign On must be set to Manual.' },
      { id: 'opt-C', letter: 'C', text: 'HQ-ISFW-2 must be authorized on HQ-ISFW.' },
      { id: 'opt-D', letter: 'D', text: 'Management IP must be set to 10.0.13.254.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['Security Fabric']
  },
  {
    docNumber: 58,
    origin: '58. What is the primary FortiGate election process when HA override is enabled?',
    blocks: [
      { id: 'b1', type: 'text', content: 'What is the primary FortiGate election process when HA override is enabled?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Connected monitored ports > Priority > HA uptime > Fortigate Serial number.' },
      { id: 'opt-B', letter: 'B', text: 'Connected monitored ports > Priority > System uptime > Fortigate Serial number.' },
      { id: 'opt-C', letter: 'C', text: 'Connected monitored ports > HA uptime > Priority > Fortigate Serial number.' },
      { id: 'opt-D', letter: 'D', text: 'Connected monitored ports > System uptime > Priority > Fortigate Serial number.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['HA', 'Election', 'FGCP']
  },
  {
    docNumber: 59,
    origin: '59. = questao 50 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'terminal', content: `date=2025-02-4 time=09:07:59 logid=0100022700 type=event subtype=system level=critical vd="root" logdesc="IPS session scan paused" action="drop" msg="IPS session scan, enter fail open mode"` },
      { id: 'b3', type: 'text', content: 'What can you conclude from the log shown in the exhibit?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The IPS socket buffer is full and IPS engine needs more memory to create new sessions.' },
      { id: 'opt-B', letter: 'B', text: 'The IPS socket buffer is full and IPS engine cannot decode a packet.' },
      { id: 'opt-C', letter: 'C', text: 'The IPS scan is paused by the IPS diagnostic command with bypass mode option 5.' },
      { id: 'opt-D', letter: 'D', text: 'The IPS session scan is paused and reevaluating the packet because of a dirty flag.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['IPS', 'Logs', 'Fail Open']
  },
  {
    docNumber: 60,
    origin: '60. = questao 51 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibit: Network diagram showing Sales (port1), Engineering (port2), Support (port3) connected to FortiGate and Web server' },
      { id: 'b3', type: 'text', content: `FortiGate has two separate firewall policies for Sales and Engineering to access the same web server with the same security profiles.
Which action must the administrator perform to consolidate the two policies into one?` }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Select port1 and port2 subnets in a single firewall policy.' },
      { id: 'opt-B', letter: 'B', text: 'Create an Aggregate interface that includes port1 and port2 to create a single firewall policy.' },
      { id: 'opt-C', letter: 'C', text: 'Replace port1 and port2 with the any interface in a single firewall policy.' },
      { id: 'opt-D', letter: 'D', text: 'Enable Multiple Interface Policies to select port1 and port2 in the same firewall policy' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['Firewall Policy', 'Multiple Interface Policies']
  },
  {
    docNumber: 61,
    origin: '61. = questao 53 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit. An intrusion prevention system (IPS) profile signature setting is shown.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibit: IPS profile signature setting (Add Signatures, Type Signature, Action Block, Packet logging Enable, Name FTP.Login.Failed, Severity Low, Target Server, OS All, Action Pass)' },
      { id: 'b3', type: 'text', content: 'What can you conclude about the signature when adding the FTP.Login.Failed signature to the IPS Sensor profile?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The signature setting uses a custom rating threshold.' },
      { id: 'opt-B', letter: 'B', text: 'FortiGate allows this low severity signature packet and creates a log.' },
      { id: 'opt-C', letter: 'C', text: 'FortiGate stores a local copy of the packet that matches the signature.' },
      { id: 'opt-D', letter: 'D', text: 'The signature setting includes a group of other signatures.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['IPS', 'Signatures']
  },
  {
    docNumber: 62,
    origin: '62. = questao 56 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: `A network administrator enabled antivirus and selected an SSL inspection profile on a firewall policy.
When downloading an EICAR test file through HTTP, FortiGate detects the virus and blocks the file. When downloading the same file through HTTPS, FortiGate does not detect the virus and does not block the file, allowing it to be downloaded.
The administrator confirms that the traffic matches the configured firewall policy. 
What are two reasons for the failed virus detection by FortiGate? (Choose two.)` }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The selected SSL inspection profile has certificate inspection enabled.' },
      { id: 'opt-B', letter: 'B', text: 'The browser does not trust the FortiGate self-signed CA certificate.' },
      { id: 'opt-C', letter: 'C', text: 'The website is exempted from SSL inspection.' },
      { id: 'opt-D', letter: 'D', text: 'The EICAR test file exceeds the protocol options oversize limit.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['Antivirus', 'SSL Inspection', 'EICAR']
  },
  {
    docNumber: 63,
    origin: '63. = questao 63 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Which two statements about equal-cost multi-path (ECMP) configuration on FortiGate are true? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'If SD-WAN is disabled, you configure the load balancing algorithm in config system settings.' },
      { id: 'opt-B', letter: 'B', text: 'If SD-WAN is disabled, you can configure the parameter v4-ecmp-mode to volume-based.' },
      { id: 'opt-C', letter: 'C', text: 'If SD-WAN is enabled, you control the load balancing algorithm with the parameter load-balance-mode.' },
      { id: 'opt-D', letter: 'D', text: 'If SD-WAN is enabled, you can configure routes with unequal distance and priority values to be part of ECMP.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['ECMP', 'Routing', 'SD-WAN']
  },
  {
    docNumber: 64,
    origin: '64. = questao 64 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'terminal', content: `Packet trace output:
06:39:29  vd-root:0 received a packet(proto=1, 10.0.11.50:3->100.65.0.254:2048) tun_id=0.0.0.0 from port4, type=8, code=0, id=3, seq=168
06:39:29  allocate a new session-00000ec6
06:39:29  in-[port4], out-[]
06:39:29  len=0
06:39:29  result: skb_flags-02000000, vid-0, ret-no-match, act-accept, flag-00000000
06:39:29  find a route: flag=00000000 gw-0.0.0.0 via port2
06:39:29  in-[port4], out-[port2], skb_flags-02000000, vid-0, app_id: 0, url_cat_id: 0
06:39:29  gnum-100004, use addr/intf hash, len=1
06:39:29  checked gnum-100004 policy-0, ret-matched, act-accept
06:39:29  ret-matched
06:39:29  policy-0 is matched, act-drop
06:39:29  after iprope_captive_check(): is_captive-0, ret-matched, act-drop, idx-0
06:39:29  after iprope_captive_check(): is_captive=0, ret-matched, act-drop, idx-0
06:39:29  Denied by forward policy check (policy 0)` },
      { id: 'b3', type: 'text', content: 'Why did the FortiGate device drop the packet?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'It matched the default implicit firewall policy.' },
      { id: 'opt-B', letter: 'B', text: 'It failed the RPF check.' },
      { id: 'opt-C', letter: 'C', text: 'It matched an explicitly configured firewall policy with the action DENY.' },
      { id: 'opt-D', letter: 'D', text: 'It cannot reach the next-hop IP' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['Packet Trace', 'Firewall Policy', 'Troubleshooting']
  },
  {
    docNumber: 65,
    origin: '65. = questao 61 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'What are three key routing principles in SD-WAN? (Choose three.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'SD-WAN rules have precedence over any other type of routes.' },
      { id: 'opt-B', letter: 'B', text: 'By default, SD-WAN rules are skipped if only one route to the destination is available.' },
      { id: 'opt-C', letter: 'C', text: 'Regular policy routes have precedence over SD-WAN rules.' },
      { id: 'opt-D', letter: 'D', text: 'By default, SD-WAN rules are skipped if the included SD-WAN members do not have a valid route to the destination.' },
      { id: 'opt-E', letter: 'E', text: 'By default, SD-WAN rules are skipped if the best route to the destination is not an SD-WAN member' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 3,
    correctAnswers: [],
    tags: ['SD-WAN', 'Routing Principles']
  },
  {
    docNumber: 66,
    origin: '66. = questao 77 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'An administrator configures FortiGuard servers as DNS servers on FortiGate using default settings. What is true about the DNS connection to a FortiGuard server?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'It uses UDP 53.' },
      { id: 'opt-B', letter: 'B', text: 'It uses DNS over HTTPS.' },
      { id: 'opt-C', letter: 'C', text: 'It uses DNS over TLS.' },
      { id: 'opt-D', letter: 'D', text: 'It uses UDP 8888.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['FortiGuard', 'DNS']
  },
  {
    docNumber: 67,
    origin: '67. = questao 80 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit.' },
      { id: 'b2', type: 'terminal', content: `HQ-NGFW-1 HA configuration:
HQ-NGFW-1 # config system ha
HQ-NGFW-1 (ha) # show
config system ha
    set group-id 5
    set group-name "Training"
    set mode a-p
    set password ENC nmk7zGYiRrux1
    set hbdev "port7" 0
    set session-pickup enable
    set override disable
    set priority 200
    set monitor "port1"
end

HQ-NGFW-2 HA configuration:
HQ-NGFW-2 (ha) # show
config system ha
    set group-id 5
    set group-name "Training"
    set mode a-p
    set password ENC n4OG3jdm0K50s
    set hbdev "port7" 0
    set session-pickup enable
    set override disable
    set priority 100
    set monitor "port1"
end` },
      { id: 'b3', type: 'text', content: 'An administrator configured both members of an HA cluster at the same time. After one week of monitoring, the administrator wants to verify the HA failover performance. How can the administrator force a failover?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The administrator must reset the HA uptime on HQ-NGFW-1.' },
      { id: 'opt-B', letter: 'B', text: 'The administrator must set the parameter override to enable on HQ-NGFW-2.' },
      { id: 'opt-C', letter: 'C', text: 'The administrator must set the monitored port1 to down on HQ-NGFW-1.' },
      { id: 'opt-D', letter: 'D', text: 'The administrator must increase the HA priority on HQ-NGFW-2.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['HA', 'FGCP', 'Failover']
  },
  {
    docNumber: 68,
    origin: '68. = questao 81 do documento "dump exam topics v1.1"',
    blocks: [
      { id: 'b1', type: 'text', content: 'An administrator has configured the following settings.' },
      { id: 'b2', type: 'terminal', content: `config system settings
    set ses-denied-traffic enable
end

config system global
    set block-session-timer 30
end` },
      { id: 'b3', type: 'text', content: 'What are the two results of this configuration? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The number of logs generated by denied traffic is reduced.' },
      { id: 'opt-B', letter: 'B', text: 'A session for denied traffic is created.' },
      { id: 'opt-C', letter: 'C', text: 'Denied users are blocked for 30 minutes.' },
      { id: 'opt-D', letter: 'D', text: 'Session helpers are disabled for denied traffic' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['Sessions', 'CLI', 'Denied Traffic']
  },
  {
    docNumber: 69,
    origin: '69. = questao 57 do site “examtopics”',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibits.' },
      { id: 'b2', type: 'image', pending: true, label: 'Exhibits: Network diagram (Workstation 10.0.11.50/24 -> LAN port4 10.0.11.254/24 -> WAN port2 100.65.0.101/24), VIP configuration, Firewall policies (Policy 1: Internet ACCEPT, IP Pool; Policy 2: WebServer ACCEPT VIP)' },
      { id: 'b3', type: 'text', content: `The exhibits show a diagram of a FortiGate device connected to the network, and the firewall policies, VIP, and IP pool configurations on the FortiGate device.
The WAN (port2) interface has the IP address 100.65.0.101/24.
The LAN (port4) interface has the IP address 10.0.11.254/24.
The first firewall policy has NAT enabled using the IP pool. The second firewall policy is configured with a VIP as the destination address.
Which IP address will be used to source NAT (SNAT) the internet traffic coming from a workstation with the IP address 10.0.11.50?` }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: '100.65.0.200' },
      { id: 'opt-B', letter: 'B', text: '100.65.0.102' },
      { id: 'opt-C', letter: 'C', text: '100.65.0.101' },
      { id: 'opt-D', letter: 'D', text: '10.0.11.254' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['NAT', 'SNAT', 'Firewall Policy']
  },
  {
    docNumber: 70,
    origin: '70. = questao 58 do site “examtopics”',
    blocks: [
      { id: 'b1', type: 'text', content: 'Refer to the exhibit, which shows a partial configuration from the remote authentication server.' },
      { id: 'b2', type: 'terminal', content: `Attribute               Value       Vendor      Actions
Fortinet-Group-Name     Training    Fortinet    Edit / Delete` },
      { id: 'b3', type: 'text', content: 'Why does the FortiGate administrator need this configuration?' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'To authenticate only the Training user group.' },
      { id: 'opt-B', letter: 'B', text: 'To authenticate Any FortiGate user groups.' },
      { id: 'opt-C', letter: 'C', text: 'To authenticate and match the Training OU on the RADIUS server.' },
      { id: 'opt-D', letter: 'D', text: 'To set up a RADIUS server Secret.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['RADIUS', 'Authentication']
  },
  {
    docNumber: 71,
    origin: '71. = questao 66 do site “examtopics”',
    blocks: [
      { id: 'b1', type: 'text', content: `An administrator suspects that the Collector Agent is not forwarding login events to FortiGate.
What is the most effective troubleshooting step?` }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Verify if DC agent is enabled on the FortiGate.' },
      { id: 'opt-B', letter: 'B', text: 'Restart the domain controller to refresh authentication services.' },
      { id: 'opt-C', letter: 'C', text: 'Check if TCP port 8000 is open between the collector agent and FortiGate.' },
      { id: 'opt-D', letter: 'D', text: 'Verify if FortiGate is set to use LDAP authentication instead of FSSO.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['FSSO', 'Collector Agent', 'Troubleshooting']
  },
  {
    docNumber: 72,
    origin: '72. = questao 67 do site “examtopics”',
    blocks: [
      { id: 'b1', type: 'text', content: `A network administrator wants to set up redundant IPsec VPN tunnels on FortiGate by using two IPsec VPN tunnels and static routes.
All traffic must be routed through the primary tunnel when both tunnels are up. The secondary tunnel must be used only if the primary tunnel goes down. In addition, FortiGate should be able to detect a dead tunnel to speed up tunnel failover.
Which two key configuration changes must the administrator make on FortiGate to meet the requirements? (Choose two.)` }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Enable Dead Peer Detection.' },
      { id: 'opt-B', letter: 'B', text: 'Use the VPN wizard to create an IPsec template for a redundant IPsec VPN tunnel.' },
      { id: 'opt-C', letter: 'C', text: 'Configure a lower distance on the static route for the primary tunnel, and a higher distance on the static route for the secondary tunnel.' },
      { id: 'opt-D', letter: 'D', text: 'In the phase1-interface, enable npu-offload to detect a dead tunnel.' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['IPsec', 'VPN', 'Redundancy', 'Routing']
  },
  {
    docNumber: 74,
    origin: '74. = questao 69 do site “examtopics”',
    blocks: [
      { id: 'b1', type: 'text', content: `An administrator wants to address shadow IT visibility challenges and prevent users from sending sensitive files outside the organization without proper approval.
Which FortiSASE method should the administrator implement to achieve these goals?` }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Secure internet access (SIA)' },
      { id: 'opt-B', letter: 'B', text: 'Secure private access (SPA)' },
      { id: 'opt-C', letter: 'C', text: 'Secure SaaS access (SSA)' },
      { id: 'opt-D', letter: 'D', text: 'Secure SD-WAN access (SSD-WAN)' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['FortiSASE', 'SSA']
  },
  {
    docNumber: 75,
    origin: '75. = questao 70 do site “examtopics”',
    blocks: [
      { id: 'b1', type: 'image', pending: true, label: 'Exhibit: Logging Settings (FortiAnalyzer Status Enabled, Server 10.0.13.125, Upload option Real Time)' },
      { id: 'b2', type: 'text', content: `You are configuring FortiAnalyzer on FortiGate.
Which step must you take to connect FortiAnalyzer to FortiGate?` }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Verify the FortiAnalyzer serial number.' },
      { id: 'opt-B', letter: 'B', text: 'Enable disk logging on FortiGate.' },
      { id: 'opt-C', letter: 'C', text: 'Authorize FortiGate on FortiAnalyzer.' },
      { id: 'opt-D', letter: 'D', text: 'Configure UDP port 514 on FortiGate.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['FortiAnalyzer', 'Logging']
  },
  {
    docNumber: 76,
    origin: '76. = questao 70 do site “examtopics”',
    blocks: [
      { id: 'b1', type: 'image', pending: true, label: 'Exhibits: Network diagram (Remote-User1 203.0.115.23, Remote-User2 201.0.114.23 -> FortiGate -> Webserver 10.0.1.10), Firewall address object (Deny_IP 201.0.114.23/32), Firewall policies (Policy 4: Deny WAN port1 -> LAN port3 Source Deny_IP Destination all DENY, Policy 3: Allow_access Source all Destination Webserver ACCEPT)' },
      { id: 'b2', type: 'text', content: `The exhibits show a diagram of a FortiGate device connected to the network, and the firewall configuration.
An administrator created a Deny policy with default settings to deny Webserver access for Remote-User2.
The policy should work such that Remote-User1 must be able to access the Webserver while preventing Remote-User2 from accessing the Webserver.
Which additional configuration can the administrator add to a deny firewall policy, beyond the default behavior, to block Remote-User2 from accessing the Webserver?` }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Set the Destination address as Webserver in the Deny policy.' },
      { id: 'opt-B', letter: 'B', text: 'Disable match-vip in the Allow_access policy.' },
      { id: 'opt-C', letter: 'C', text: 'Set the Destination address as Deny_IP in the Allow_access policy.' },
      { id: 'opt-D', letter: 'D', text: 'Configure a One-to-One IP Pool object in a new policy.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['Firewall Policy', 'VIP', 'Deny Policy']
  },
  {
    docNumber: 77,
    origin: '77. = questao 74 do site “examtopics”',
    blocks: [
      { id: 'b1', type: 'text', content: `You have configured the FortiGate device for FSSO. A user is successful in log-in to windows, but their access to the internet is denied.
What should the administrator check first?` }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'The FortiGate firewall policy settings for SSL decryption.' },
      { id: 'opt-B', letter: 'B', text: 'The FortiGate FSSO active users list for user’s IP address.' },
      { id: 'opt-C', letter: 'C', text: 'The windows event viewer for failed login attempts.' },
      { id: 'opt-D', letter: 'D', text: 'Whether the user is assigned to the correct AD group.' }
    ],
    isMultipleChoice: false,
    requiredAnswersCount: 1,
    correctAnswers: [],
    tags: ['FSSO', 'Troubleshooting']
  },
  {
    docNumber: 78,
    origin: '78. = questao 82 do site “examtopics”',
    blocks: [
      { id: 'b1', type: 'text', content: 'Which two features of IPsec IKEv1 authentication are supported by FortiGate? (Choose two.)' }
    ],
    options: [
      { id: 'opt-A', letter: 'A', text: 'Pre-shared key and certificate signature as authentication methods' },
      { id: 'opt-B', letter: 'B', text: 'No certificate is required on the remote peer when you set the certificate signature as the authentication method' },
      { id: 'opt-C', letter: 'C', text: 'Extended authentication (XAuth) to request the remote peer to provide a username and password' },
      { id: 'opt-D', letter: 'D', text: 'Extended authentication (XAuth) for faster authentication because fewer packets are exchanged' }
    ],
    isMultipleChoice: true,
    requiredAnswersCount: 2,
    correctAnswers: [],
    tags: ['IPsec', 'IKEv1', 'Authentication']
  }
];

// Enrich with ID
const fullQuestions = rawQuestions.map(q => ({
  id: `q-${q.docNumber}`,
  ...q,
  warnings: []
}));

const tsContent = `// Auto-generated seed data for FortiQuest NSE4 questions
// Total questions: ${fullQuestions.length} (Doc numbers 1 to 78, excluding 73)
import { Question } from '../types/quiz';

export const SEED_QUESTIONS: Question[] = ${JSON.stringify(fullQuestions, null, 2)};
`;

const outDir = path.resolve('./src/data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(path.join(outDir, 'seedQuestions.ts'), tsContent, 'utf-8');
console.log('Successfully written seedQuestions.ts with', fullQuestions.length, 'questions!');
