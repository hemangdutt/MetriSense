/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Evaluation } from './types/oiml';
import { EvaluationRepository } from './services/evaluationRepository';
import { Sidebar, NavTab } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { NewEvaluationScreen } from './screens/NewEvaluationScreen';
import { ArchiveScreen } from './screens/ArchiveScreen';
import { EvaluationDetailScreen } from './screens/EvaluationDetailScreen';
import { ReportPreviewScreen } from './screens/ReportPreviewScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { FlutterSourceModal } from './components/FlutterSourceModal';

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [officerName, setOfficerName] = useState<string>('Dr. V. Ramanathan, Lead Metrologist');
  const [officerId, setOfficerId] = useState<string>('NMI-OFFICER-76');

  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
  const [selectedEvaluationId, setSelectedEvaluationId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Repository Data State
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isFlutterModalOpen, setIsFlutterModalOpen] = useState<boolean>(false);

  // Load evaluations on mount
  useEffect(() => {
    const list = EvaluationRepository.getAll();
    setEvaluations(list);
    if (list.length > 0 && !selectedEvaluationId) {
      setSelectedEvaluationId(list[0].id);
    }
  }, []);

  const handleLoginSuccess = (name: string) => {
    setOfficerName(name);
    setIsAuthenticated(true);
    setCurrentTab('overview');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleSaveNewEvaluation = (newEval: Evaluation) => {
    EvaluationRepository.save(newEval);
    const updated = EvaluationRepository.getAll();
    setEvaluations(updated);
    setSelectedEvaluationId(newEval.id);
    setCurrentTab('report-preview');
  };

  const handleViewEvaluation = (evalId: string) => {
    setSelectedEvaluationId(evalId);
    setCurrentTab('detail');
  };

  const handleViewReport = (evalId: string) => {
    setSelectedEvaluationId(evalId);
    setCurrentTab('report-preview');
  };

  const handleResetDemoData = () => {
    EvaluationRepository.resetToDemoData();
    const updated = EvaluationRepository.getAll();
    setEvaluations(updated);
    if (updated.length > 0) {
      setSelectedEvaluationId(updated[0].id);
    }
  };

  // Resolve active evaluation
  const activeEvaluation =
    evaluations.find((e) => e.id === selectedEvaluationId) || evaluations[0];

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="h-screen bg-[#07090A] text-[#EEEEEE] flex font-sans selection:bg-white/15 selection:text-white relative overflow-hidden">
      {/* Subtle Graphite Smoked Glass Depth Architecture */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-20 w-[650px] h-[550px] bg-white/[0.015] rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-white/[0.012] rounded-full blur-[160px]" />
        <div className="absolute -bottom-40 left-1/4 w-[700px] h-[500px] bg-white/[0.018] rounded-full blur-[180px]" />
      </div>

      {/* Permanent Smoked Glass Sidebar (240px) - Locked & Non-scrollable */}
      <div className="relative z-20 shrink-0 h-screen overflow-hidden select-none">
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            if (tab === 'evaluations') {
              setCurrentTab('overview');
            } else if (tab === 'reports') {
              setCurrentTab('report-preview');
            } else {
              setCurrentTab(tab);
            }
          }}
          officerName={officerName}
          officerId={officerId}
          onLogout={handleLogout}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          onOpenFlutterSource={() => setIsFlutterModalOpen(true)}
        />
      </div>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        {/* Simple Top Bar Header */}
        <Header
          currentTab={currentTab}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          officerName={officerName.split(',')[0]}
          activeEvaluationId={selectedEvaluationId || undefined}
        />

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {(currentTab === 'overview' || currentTab === 'evaluations') && (
            <DashboardScreen
              evaluations={evaluations}
              onNewEvaluation={() => setCurrentTab('new-evaluation')}
              onViewEvaluation={handleViewEvaluation}
              onViewReport={handleViewReport}
              onViewArchive={() => setCurrentTab('archive')}
            />
          )}

          {currentTab === 'new-evaluation' && (
            <NewEvaluationScreen
              officerName={officerName}
              onSaveEvaluation={handleSaveNewEvaluation}
              onCancel={() => setCurrentTab('overview')}
              generatedId={EvaluationRepository.generateNextId()}
            />
          )}

          {currentTab === 'archive' && (
            <ArchiveScreen
              evaluations={evaluations}
              onViewEvaluation={handleViewEvaluation}
              onViewReport={handleViewReport}
              onResetDemoData={handleResetDemoData}
            />
          )}

          {currentTab === 'detail' && activeEvaluation && (
            <EvaluationDetailScreen
              evaluation={activeEvaluation}
              onBack={() => setCurrentTab('overview')}
              onOpenReport={() => setCurrentTab('report-preview')}
            />
          )}

          {currentTab === 'report-preview' && activeEvaluation && (
            <ReportPreviewScreen
              evaluation={activeEvaluation}
              onBack={() => setCurrentTab('overview')}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsScreen officerName={officerName} />
          )}
        </main>
      </div>

      {/* Flutter Source Code Modal */}
      <FlutterSourceModal
        isOpen={isFlutterModalOpen}
        onClose={() => setIsFlutterModalOpen(false)}
      />
    </div>
  );
}
