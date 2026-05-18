
'use client';

import { useState } from 'react';
import { FileText, Download, Wand2, Loader2 } from 'lucide-react';

export default function AppointmentAgent() {
  const [info, setInfo] = useState({
    name: '고희정',
    empNo: '2024082104',
    dept: 'People Partner > HRBP2',
    currentTask: 'Sr. Specialist (성과관리 및 프로모션/PIP 운영)',
    ratings: '25상(Exceeding), 24연말(Meeting)',
    appointmentDate: '2026-06-01',
    newTeam: '브랜드개발 HRBP팀'
  });

  const [narratives, setNarratives] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [finalHtml, setFinalHtml] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
      });
      const data = await res.json();
      if (data.success) {
        setNarratives(data.narratives);
        setFinalHtml(data.html);
      }
    } catch (err) {
      alert('생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([finalHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `매니저선임신청서_${info.name}.html`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <header className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="text-blue-600" /> 매니저 선임 에이전트
          </h1>
          <p className="text-slate-500">아마존식 내러티브 기반 신청서 자동 생성기</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 입력 섹션 */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">대상자 정보 입력</h2>
          <div className="space-y-4">
            {Object.entries(info).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setInfo({ ...info, [key]: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
            ))}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
              아마존식 내러티브 생성
            </button>
          </div>
        </section>

        {/* 결과 미리보기 섹션 */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[500px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">AI 생성 초안 미리보기</h2>
            {narratives && (
              <button
                onClick={downloadHtml}
                className="text-blue-600 flex items-center gap-1 text-sm font-medium hover:underline"
              >
                <Download size={16} /> HTML 다운로드
              </button>
            )}
          </div>

          {!narratives && !loading && (
            <div className="flex-1 border-2 border-dashed border-slate-100 rounded-lg flex flex-col items-center justify-center text-slate-400">
              <Wand2 size={48} className="mb-2 opacity-20" />
              <p>정보를 입력하고 생성 버튼을 눌러주세요.</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <Loader2 size={48} className="animate-spin mb-2 text-blue-500" />
              <p>아마존식 내러티브를 구성 중입니다...</p>
            </div>
          )}

          {narratives && (
            <div className="flex-1 space-y-6 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h3 className="font-bold text-sm text-slate-500 mb-2 uppercase tracking-wider">4. 직무 전문성</h3>
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: narratives.item4 }} />
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h3 className="font-bold text-sm text-slate-500 mb-2 uppercase tracking-wider">5. 리더십 잠재력</h3>
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: narratives.item5 }} />
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h3 className="font-bold text-sm text-slate-500 mb-2 uppercase tracking-wider">6. 조직 기여도</h3>
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: narratives.item6 }} />
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
