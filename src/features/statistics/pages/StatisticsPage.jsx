import { useState } from 'react';
import StatisticsTabMenu from '../components/common/StatisticsTabMenu';
import UserMetricSection from '../components/user/UserMetricSection';
import ContentMetricSection from '../components/content/ContentMetricSection';
import CurrencyMonitorSection from '../components/currency/CurrencyMonitorSection';
import WithdrawalReasonSection from '../components/withdrawal/WithdrawalReasonSection';

export default function StatisticsPage() {
  const [activeTab, setActiveTab] = useState('user');

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold leading-8 text-neutral-950">통계</h1>

      <StatisticsTabMenu activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'user' && <UserMetricSection />}
      {activeTab === 'content' && <ContentMetricSection />}
      {activeTab === 'currency' && <CurrencyMonitorSection />}
      {activeTab === 'withdrawal' && <WithdrawalReasonSection />}
    </div>
  );
}