import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { renderMarkdown } from '@grafana/data';
import { Page } from 'app/core/components/Page/Page';
import { contextSrv } from 'app/core/core';
import { OrgUser, OrgRole, StoreState } from 'app/types';

import { OrgUsersTable } from '../admin/Users/OrgUsersTable';
import InviteesTable from '../invites/InviteesTable';
import { fetchInvitees } from '../invites/state/actions';
import { selectInvitesMatchingQuery } from '../invites/state/selectors';

import { UsersActionBar } from './UsersActionBar';
import { loadUsers, removeUser, updateUser, changePage } from './state/actions';
import { getUsers, getUsersSearchQuery } from './state/selectors';

function mapStateToProps(state: StoreState) {
  const searchQuery = getUsersSearchQuery(state.users);
  return {
    users: getUsers(state.users),
    searchQuery: getUsersSearchQuery(state.users),
    page: state.users.page,
    totalPages: state.users.totalPages,
    perPage: state.users.perPage,
    invitees: selectInvitesMatchingQuery(state.invites, searchQuery),
    externalUserMngInfo: state.users.externalUserMngInfo,
    isLoading: state.users.isLoading,
  };
}

const mapDispatchToProps = {
  loadUsers,
  fetchInvitees,
  changePage,
  updateUser,
  removeUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = ConnectedProps<typeof connector>;

export interface State {
  showInvites: boolean;
}

export const UsersListPageUnconnected = ({
  users,
  page,
  totalPages,
  invitees,
  externalUserMngInfo,
  isLoading,
  loadUsers,
  fetchInvitees,
  changePage,
  updateUser,
  removeUser,
}: Props) => {
  const [showInvites, setShowInvites] = useState(false);
  const externalUserMngInfoHtml = externalUserMngInfo ? renderMarkdown(externalUserMngInfo) : '';

  useEffect(() => {
    loadUsers();
    fetchInvitees();
  }, [fetchInvitees, loadUsers]);

  const onRoleChange = (role: OrgRole, user: OrgUser) => {
    updateUser({ ...user, role: role });
  };

  const onRemoveUser = (user: OrgUser) => removeUser(user.userId);

  const onShowInvites = () => {
    setShowInvites(!showInvites);
  };

  const renderTable = () => {
    if (showInvites) {
      return <InviteesTable invitees={invitees} />;
    } else {
      return (
        <OrgUsersTable
          users={users}
          orgId={contextSrv.user.orgId}
          onRoleChange={onRoleChange}
          onRemoveUser={onRemoveUser}
          changePage={changePage}
          page={page}
          totalPages={totalPages}
        />
      );
    }
  };

  return (
    <Page.Contents isLoading={!isLoading}>
      <UsersActionBar onShowInvites={onShowInvites} showInvites={showInvites} />
      {externalUserMngInfoHtml && (
        <div className="grafana-info-box" dangerouslySetInnerHTML={{ __html: externalUserMngInfoHtml }} />
      )}
      {isLoading && renderTable()}
    </Page.Contents>
  );
};

export const UsersListPageContent = connector(UsersListPageUnconnected);

export default function UsersListPage() {
  return (
    <Page navId="users">
      <UsersListPageContent />
    </Page>
  );
}
