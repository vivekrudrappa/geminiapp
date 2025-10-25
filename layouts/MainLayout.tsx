
import React, { ReactNode } from 'react';
import { useAppContext } from '../context/AppContext';
import { SettingsIcon, UserIcon, BotIcon, PlusIcon, LogoutIcon } from '../components/icons';
import AdminView from '../features/admin/AdminView';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser, companySettings, isSidebarOpen, toggleSidebar, openSettingsModal, isSettingsModalOpen, closeSettingsModal } = useAppContext();

  return (
    <div className="flex h-screen w-screen bg-nexus-dark font-sans">
      {/* Sidebar */}
      <aside className={`bg-nexus-surface flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className={`flex items-center p-4 border-b border-nexus-secondary ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {isSidebarOpen && <span className="text-xl font-bold">{companySettings.companyName}</span>}
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-nexus-secondary transition-colors">
            {/* Hamburger/Close Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>

        <nav className="flex-grow p-2 space-y-2">
          <a href="#" className="flex items-center p-2 text-nexus-text bg-nexus-primary/20 rounded-md font-semibold">
            <PlusIcon className="w-6 h-6" />
            {isSidebarOpen && <span className="ml-3">New Chat</span>}
          </a>
          <div className="pt-4">
             {isSidebarOpen && <h3 className="px-2 text-xs font-semibold text-nexus-text-secondary uppercase tracking-wider">Recent Chats</h3>}
             <div className="mt-2 space-y-1">
                 {['API Integration Strategy', 'Q3 Marketing Plan', 'Onboarding Flow Ideas'].map(chat => (
                    <a key={chat} href="#" className="flex items-center p-2 text-sm text-nexus-text-secondary hover:bg-nexus-secondary rounded-md truncate">
                        {isSidebarOpen ? chat : <BotIcon className="w-5 h-5 mx-auto" />}
                    </a>
                 ))}
             </div>
          </div>
        </nav>

        <div className="p-2 border-t border-nexus-secondary">
          {currentUser.role === 'admin' && (
            <button onClick={openSettingsModal} className="w-full flex items-center p-2 text-nexus-text-secondary hover:bg-nexus-secondary rounded-md">
              <SettingsIcon className="w-6 h-6" />
              {isSidebarOpen && <span className="ml-3">Admin Settings</span>}
            </button>
          )}
           <div className="w-full flex items-center p-2 mt-2 text-nexus-text-secondary rounded-md">
              <img src={currentUser.avatarUrl} alt="User Avatar" className="w-8 h-8 rounded-full" />
              {isSidebarOpen && <div className="ml-3 leading-tight">
                  <p className="font-semibold text-nexus-text text-sm">{currentUser.name}</p>
                  <p className="text-xs">{currentUser.email}</p>
              </div>}
           </div>
           <button className="w-full flex items-center p-2 text-nexus-text-secondary hover:bg-nexus-secondary rounded-md mt-1">
              <LogoutIcon className="w-6 h-6" />
              {isSidebarOpen && <span className="ml-3">Logout</span>}
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full">
        {children}
      </main>

      {/* Admin Settings Modal */}
      {isSettingsModalOpen && currentUser.role === 'admin' && (
        <AdminView isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
      )}
    </div>
  );
};

export default MainLayout;
