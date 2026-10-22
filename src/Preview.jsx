import { useState, Component } from 'react';
import Dashboard from './pages/Dashboard';
import Transacoes from './pages/Transacoes';
import Relatorios from './pages/Relatorios';
import Sugestoes from './pages/Sugestoes';
import Simulador from './pages/Simulador';
import WhatsApp from './pages/WhatsApp';

// Banco de dados fictício ultra completo para nenhuma tela quebrar
const dbMock = {
  categorias: [
    { id: '1', descricao: 'Alimentação' }, 
    { id: '2', descricao: 'Salário' },
    { id: '3', descricao: 'Transporte' }
  ],
  transacoes: [
    { id: '1', data: '2026-10-22', tipo: 'GASTO', categoriaId: '1', descricao: 'Mercado', valor: 52.90, pago: true },
    { id: '2', data: '2026-10-20', tipo: 'ENTRADA', categoriaId: '2', descricao: 'Freela', valor: 1200.00, recebido: true }
  ],
  relatorios: [
    { 
      id: '1', 
      criadoEm: new Date().toISOString(), 
      de: '2026-10', 
      ate: '2026-10', 
      totalEntradas: 1200.00, 
      totalGastos: 52.90, 
      saldoAtual: 1147.10, 
      saldoProjetado: 1147.10, 
      itens: [
        { data: '2026-10-22', tipo: 'GASTO', categoria: 'Alimentação', descricao: 'Mercado', valor: 52.90, situacao: 'Paga' }
      ] 
    }
  ],
  onboarded: true,
  perfil: 'moderado'
};

const P = { 
  db: dbMock, 
  update: (cb) => { console.log('Update disparado'); }, 
  toast: (msg) => { alert(msg); }, 
  user: { id: '1', nome: 'Dev Teste', email: 'dev@teste.com', salario: 5000 } 
};

// Componente de segurança para capturar erros e não deixar a tela branca
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: '#dc2626', background: '#fee2e2', borderRadius: '8px', margin: '20px' }}>
          <h3>⚠️ Esta tela específica quebrou:</h3>
          <p>{this.state.error?.toString()}</p>
          <small>Isso acontece porque esta página precisa de alguma propriedade no banco de dados que não foi simulada.</small>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Preview() {
  const [telaAtiva, setTelaAtiva] = useState('relatorios');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'sans-serif', background: '#0f172a' }}>
      {/* Menu superior fixo para alternar entre as telas */}
      <div style={{ background: '#1e293b', padding: '15px', display: 'flex', gap: '10px', borderBottom: '1px solid #334155' }}>
        <button onClick={() => setTelaAtiva('dashboard')} style={{...btnEstilo, background: telaAtiva === 'dashboard' ? '#2563eb' : '#475569'}}>Dashboard</button>
        <button onClick={() => setTelaAtiva('gastos')} style={{...btnEstilo, background: telaAtiva === 'gastos' ? '#2563eb' : '#475569'}}>Gastos</button>
        <button onClick={() => setTelaAtiva('relatorios')} style={{...btnEstilo, background: telaAtiva === 'relatorios' ? '#2563eb' : '#475569'}}>Relatórios</button>
        <button onClick={() => setTelaAtiva('sugestoes')} style={{...btnEstilo, background: telaAtiva === 'sugestoes' ? '#2563eb' : '#475569'}}>Sugestões</button>
        <button onClick={() => setTelaAtiva('simulador')} style={{...btnEstilo, background: telaAtiva === 'simulador' ? '#2563eb' : '#475569'}}>Simulador</button>
        <button onClick={() => setTelaAtiva('whatsapp')} style={{...btnEstilo, background: telaAtiva === 'whatsapp' ? '#2563eb' : '#475569'}}>WhatsApp</button>
      </div>

      {/* Renderização com escudo de segurança */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }} className="app-preview-container">
        <ErrorBoundary key={telaAtiva}>
          {telaAtiva === 'dashboard' && <Dashboard {...P} />}
          {telaAtiva === 'gastos' && <Transacoes tipo="GASTO" {...P} />}
          {telaAtiva === 'relatorios' && <Relatorios {...P} />}
          {telaAtiva === 'sugestoes' && <Sugestoes {...P} />}
          {telaAtiva === 'simulador' && <Simulador {...P} />}
          {telaAtiva === 'whatsapp' && <WhatsApp {...P} />}
        </ErrorBoundary>
      </div>
    </div>
  );
}

const btnEstilo = { padding: '8px 16px', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' };
