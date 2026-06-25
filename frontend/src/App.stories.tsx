import App from './App';

export default {
  title: 'RPSLS/ArenaApp',
  component: App,
  tags: [
    'autodocs',
    'sysml:part:GameBoard',
    'sysml:part:Scoreboard',
    'sysml:part:CountdownTimer',
    'sysml:part:ChoiceSelector',
    'sysml:usecase:playRound'
  ],
  parameters: {
    // Traceability to SysML baseline parts, ports, and use cases
    // This connects our Storybook stories 3-way with requirements and architectural specifications
    sysml_traces: [
      'sysml:part:GameBoard',
      'sysml:part:Scoreboard',
      'sysml:part:CountdownTimer',
      'sysml:part:ChoiceSelector',
      'sysml:usecase:playRound'
    ]
  }
};

export const DefaultArena = () => <App />;
DefaultArena.storyName = 'RPSLS Interactive Arena App';
