import { useNavigate } from 'react-router-dom';
import MemberStatusBadge from './MemberStatusBadge';

export default function MemberTable({ members }) {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden rounded-[10px] border border-neutral-200 bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="px-12 py-5 text-left text-sm font-medium text-neutral-600">사용자 ID</th>
            <th className="px-6 py-5 text-left text-sm font-medium text-neutral-600">이메일</th>
            <th className="px-6 py-5 text-left text-sm font-medium text-neutral-600">닉네임</th>
            <th className="px-6 py-5 text-left text-sm font-medium text-neutral-600">상태</th>
            <th className="px-6 py-5 text-left text-sm font-medium text-neutral-600">
              마지막 로그인
            </th>
            <th className="px-6 py-5 text-left text-sm font-medium text-neutral-600">가입일</th>
            <th className="px-6 py-5 text-left text-sm font-medium text-neutral-600" />
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
                key={`${member.id}-${index}`}
                className="border-b border-neutral-200 last:border-b-0"
              >
                <td className="px-12 py-6 text-sm text-neutral-950">{member.id}</td>
                <td className="px-6 py-6 text-sm text-neutral-950">{member.email || '-'}</td>
                <td className="px-6 py-6 text-sm text-neutral-950">{member.nickname}</td>
                <td className="px-6 py-6">
                  <MemberStatusBadge status={member.status} />
                </td>
                <td className="px-6 py-6 text-sm text-[#525252]">{member.lastLoginAt}</td>
                <td className="px-6 py-6 text-sm text-[#525252]">{member.joinedAt}</td>
                <td className="px-6 py-6 text-sm text-black">
                  <button
                    type="button"
                    onClick={() => navigate(`/members/${member.id}`)}
                    className="hover:underline"
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
