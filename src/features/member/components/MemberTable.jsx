import { useNavigate } from 'react-router-dom';
import MemberStatusBadge from './MemberStatusBadge';
import { PATH } from '@/app/routes/path';

export default function MemberTable({ members }) {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden rounded-[10px] border border-neutral-200 bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="px-6 py-5 text-left text-sm font-medium text-neutral-600"><span className="whitespace-nowrap">사용자</span><br />ID</th>
            <th className="w-40 px-4 py-5 text-left text-sm font-medium text-neutral-600">이메일</th>
            <th className="px-4 py-5 text-left text-sm font-medium text-neutral-600 whitespace-nowrap">닉네임</th>
            <th className="px-4 py-5 text-left text-sm font-medium text-neutral-600 whitespace-nowrap">상태</th>
            <th className="px-4 py-5 text-left text-sm font-medium text-neutral-600 whitespace-nowrap">마지막 로그인</th>
            <th className="px-4 py-5 text-left text-sm font-medium text-neutral-600 whitespace-nowrap">가입일</th>
            <th className="px-4 py-5 text-left text-sm font-medium text-neutral-600" />
          </tr>
        </thead>

        <tbody>
          {members.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-10 text-center text-sm text-neutral-500">
                조회된 회원이 없습니다.
              </td>
            </tr>
          ) : (
            members.map((member, index) => (
              <tr
                key={`${member.userId}-${index}`}
                className="border-b border-neutral-200 last:border-b-0"
              >
                <td className="px-6 py-6 text-sm text-neutral-950">{member.userId}</td>
                <td className="w-40 max-w-[160px] px-4 py-6 text-sm text-neutral-950">
                  <span className="block truncate" title={member.email || '-'}>{member.email || '-'}</span>
                </td>
                <td className="px-4 py-6 text-sm text-neutral-950 whitespace-nowrap">{member.nickname}</td>
                <td className="px-4 py-6">
                  <MemberStatusBadge status={member.status} />
                </td>
                <td className="px-4 py-6 text-sm text-[#525252] whitespace-nowrap">{member.lastLoginAt}</td>
                <td className="px-4 py-6 text-sm text-[#525252] whitespace-nowrap">{member.createdAt}</td>
                <td className="px-4 py-6 text-sm text-black">
                  <button
                    type="button"
                    onClick={() => navigate(PATH.MEMBER_DETAIL.replace(':memberId', member.userId))}
                    className="whitespace-nowrap hover:underline"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
