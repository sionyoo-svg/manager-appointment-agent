
import { NarrativeService, AppointmentInfo } from '@/services/NarrativeService';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const info: AppointmentInfo = await req.json();
    
    // 1. 내러티브 생성 (AI 호출 대신 서비스 레이어 활용)
    const narratives = await NarrativeService.generateNarrative(info);
    
    // 2. HTML 템플릿에 주입
    const finalHtml = await NarrativeService.exportToHtml(info, narratives);
    
    return NextResponse.json({ 
      success: true, 
      narratives,
      html: finalHtml 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
