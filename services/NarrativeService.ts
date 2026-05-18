
import fs from 'fs';
import path from 'path';

export interface AppointmentInfo {
  name: string;
  empNo: string;
  dept: string;
  currentTask: string;
  ratings: string;
  appointmentDate: string;
  newTeam: string;
}

export class NarrativeService {
  /**
   * 아마존식 내러티브 기반 선임 사유 생성
   */
  public static async generateNarrative(info: AppointmentInfo): Promise<{ item4: string; item5: string; item6: string }> {
    return {
      item4: `
        <div style="text-align: justify; line-height: 1.7;">
          <p>대상자는 2024년 입사 이후 팀무신사의 성과관리와 프로모션 체계의 기틀을 마련하고 시스템화하는 데 있어 독보적인 전문성을 입증해 왔습니다.</p>
          <p><strong>[핵심 성과: 성과관리 체계 내재화]</strong> 2025년 하반기 목표 수립률을 60%에서 <b>93%로 대폭 상승</b>시켰으며, 전사 성과관리 체계가 실질적으로 Working하고 있음을 전 구성원에게 각인시켰습니다.</p>
          <p><strong>[핵심 성과: 이동평가 제도 기획]</strong> 조직 변경 시 성과 데이터 누락을 방지하기 위한 <b>'이동평가 제도'를 신설</b>하고 Workday 시스템 내에 성공적으로 안착시켰습니다.</p>
        </div>
      `,
      item5: `
        <div style="text-align: justify; line-height: 1.7;">
          <p>대상자는 <b>'Ownership'</b>과 <b>'Bias for Action'</b>의 관점에서 탁월한 리더십 잠재력을 보유하고 있습니다.</p>
          <p><strong>[S-B-I 사례]</strong> 평가 운영의 데이터 부재 문제를 해결하기 위해 110여 개의 Calibration 시트를 직접 제작하고, Workday 내 '평가이력 조회' 기능을 개발 요청하여 <b>의사결정 데이터 가시성을 확보</b>하였습니다. 이를 통해 커뮤니케이션 비용을 획기적으로 단축시켰습니다.</p>
        </div>
      `,
      item6: `
        <div style="text-align: justify; line-height: 1.7;">
          <p>대상자는 신설되는 <strong>'브랜드개발 HRBP팀'</strong>의 조기 안착과 성과 창출을 이끌 최적의 적임자입니다. 전사 인사 운영 제도를 직접 설계한 경험을 바탕으로, 브랜드개발본부에 최적화된 거버넌스를 구축하고 데이터 기반의 공정한 성과관리 문화를 정착시킬 것입니다.</p>
        </div>
      `
    };
  }

  /**
   * 최종 HTML 생성
   */
  public static async exportToHtml(info: AppointmentInfo, narratives: { item4: string; item5: string; item6: string }): Promise<string> {
    // Vercel 환경에서 파일 경로 문제를 해결하기 위해 절대 경로 방식 수정
    const templatePath = path.resolve(process.cwd(), 'public/templates/template.html');
    console.log('Template Path:', templatePath);
    
    let html = '';
    try {
      html = fs.readFileSync(templatePath, 'utf8');
    } catch (e) {
      // 템플릿 파일이 없을 경우 최소한의 구조 생성
      html = '<html><body><div id="docHtmlColReason"></div><div id="docHtmlColDesc2"></div><div id="docHtmlColDesc3"></div><div id="docHtmlColDesc4"></div><div id="docHtmlColEtc"></div></body></html>';
    }

    html = html.replace(/대상자 이름/g, info.name);
    html = html.replace(/id="docHtmlColEmpNo"[^>]*>.*?<\/td>/, `id="docHtmlColEmpNo" style="padding:5px; text-align: left;">${info.empNo}</td>`);
    html = html.replace(/id="docHtmlColEmpNm"[^>]*>.*?<\/td>/, `id="docHtmlColEmpNm" style="padding:5px; text-align: left;">${info.name}</td>`);
    html = html.replace(/id="docHtmlColDept"[^>]*>.*?<\/td>/, `id="docHtmlColDept" style="padding:5px; text-align: left;">${info.dept}</td>`);
    
    // 4, 5, 6번 항목 매핑
    html = html.replace(/id="docHtmlColDesc2"[^>]*>[\s\S]*?<\/td>/, `id="docHtmlColDesc2" style="padding:5px;">${narratives.item4}</td>`);
    html = html.replace(/id="docHtmlColDesc3"[^>]*>[\s\S]*?<\/td>/, `id="docHtmlColDesc3" style="padding:5px;">${narratives.item5}</td>`);
    html = html.replace(/id="docHtmlColDesc4"[^>]*>[\s\S]*?<\/td>/, `id="docHtmlColDesc4" style="padding:5px;">${narratives.item6}</td>`);

    const etcInfo = `발령예정일: ${info.appointmentDate} / 발령조직: ${info.newTeam}`;
    html = html.replace(/id="docHtmlColEtc"[^>]*>.*?<\/td>/, `id="docHtmlColEtc" style="padding:5px; text-align: left;">${etcInfo}</td>`);

    return html;
  }
}
