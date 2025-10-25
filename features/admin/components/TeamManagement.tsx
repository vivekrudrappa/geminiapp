
import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import { PlusIcon, TrashIcon } from '../../../components/icons';

const TeamManagement: React.FC = () => {
  const { teamMembers } = useAppContext();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-nexus-text mb-1">Team Management</h3>
          <p className="text-nexus-text-secondary">Invite, manage roles, and remove team members.</p>
        </div>
        <button className="flex items-center px-4 py-2 rounded-lg bg-nexus-accent text-white hover:bg-opacity-90 transition-colors">
            <PlusIcon className="w-5 h-5 mr-2" />
            Invite Member
        </button>
      </div>

      <div className="bg-nexus-surface rounded-lg border border-nexus-secondary overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-nexus-secondary/50">
            <tr>
              <th className="p-3 text-sm font-semibold text-nexus-text-secondary uppercase">Name</th>
              <th className="p-3 text-sm font-semibold text-nexus-text-secondary uppercase">Email</th>
              <th className="p-3 text-sm font-semibold text-nexus-text-secondary uppercase">Role</th>
              <th className="p-3 text-sm font-semibold text-nexus-text-secondary uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map(member => (
              <tr key={member.id} className="border-t border-nexus-secondary">
                <td className="p-3 flex items-center">
                  <img src={member.avatarUrl} alt={member.name} className="w-8 h-8 rounded-full mr-3" />
                  {member.name}
                </td>
                <td className="p-3 text-nexus-text-secondary">{member.email}</td>
                <td className="p-3">
                    <select defaultValue={member.role} className="bg-nexus-secondary border border-nexus-secondary rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-nexus-accent">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </td>
                <td className="p-3 text-right">
                    <button className="p-2 text-red-400 hover:bg-red-400/20 rounded-full transition-colors">
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamManagement;
