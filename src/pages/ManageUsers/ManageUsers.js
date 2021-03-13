import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Avatar from '../../components/elements/Avatar';
import Card from '../../components/elements/Card';
import Heading from '../../components/elements/Heading';
import IconButton from '../../components/elements/IconButton';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import FormPassword from '../../components/forms/ManageUsersPassword';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import styles from './styles.scoped.css';

export default function ManageUsers() {
  const { id, action } = useParams();
  const history = useHistory();
  if (!action) {
    return <Manage />;
  }
  return (
    <WhiteCardPlain
      back={`/manage-users/${id}`}
      help
      icon="password"
      size="medium"
      title="Enter Password">
      <FormPassword
        onSubmit={() => {
          history.push({
            pathname: '/manage-users',
            state: { notif: 'User successfully removed.' },
          });
        }}
      />
    </WhiteCardPlain>
  );
}

export function Manage() {
  const { id } = useParams();
  const history = useHistory();
  const [remove, setRemove] = useState(false);
  const title = id ? 'User Information' : 'Manage Users';
  const back = id ? '/manage-users' : '/profile';
  const subtitle =
    'By deleting this user, this user will not have access to this account anyomore. However, this user can still request for access again later.';

  return (
    <WhiteCardPlain back={back} title={title}>
      {id && (
        <IconButton
          className={styles['icon-remove']}
          name="delete"
          onClick={() => setRemove(true)}
        />
      )}
      <Package />
      {!id && <Users />}
      <ActivityLog />
      <ModalConfirmation
        onAccept={() => {
          history.push(`/manage-users/${id}/remove`);
        }}
        onClose={() => setRemove(false)}
        onRefuse={() => setRemove(false)}
        open={remove}
        subtitle={subtitle}
        title="Are you sure you want to delete this user from this account?"
      />
    </WhiteCardPlain>
  );
}

export function Package() {
  const { id } = useParams();
  const status = 'primary';
  const title = () => {
    if (id && status === 'primary') {
      return 'Primary User';
    } else if (id && status === 'secondary') {
      return 'Secondary User';
    }
    return 'Package';
  };

  const setContent = () => {
    if (id) {
      return (
        <Card className={styles['card-user']} variant="hover">
          <Avatar src="https://eyeleveljlt.com/images/team/team-2.jpg" />
          <small>Name</small>
          <p>Haryanti Lesmana</p>
          <small>Phone Number</small>
          <p>081234567890</p>
          <small>Email</small>
          <p>haryanti@gmail.com</p>
        </Card>
      );
    }
    return (
      <Card className={styles['card-package']} variant="hover">
        <small>Indihome Number</small>
        <p>1234567890</p>
        <small>Installation Address</small>
        <p>
          Jl. Address St. 123 Tangerang Selatan, BantenJl. Address St. 123 Tangerang Selatan,
          BantenJl. Address St. 123 Tangerang Selatan, BantenJl. Address St. 123 Tangerang Selatan,
          BantenJl. Address St. 123 Tangerang Selatan, BantenJl. Address St. 123 Tangerang Selatan,
          Banten
        </p>
      </Card>
    );
  };
  return (
    <section className={styles.package}>
      <Heading>{title()}</Heading>
      {setContent()}
    </section>
  );
}

export function Users() {
  return (
    <section>
      <Heading>Users</Heading>
      <Card className={styles.users} to="/manage-users/test">
        <Avatar src="https://eyeleveljlt.com/images/team/team-2.jpg" />
        <span>Michelle Lesmana</span>
        <p>You - Primary User</p>
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </Card>
      <Card className={styles.users} to="/manage-users/test">
        <Avatar src="https://fedspendingtransparency.github.io/assets/img/user_personas/journalist_mug.jpg" />
        <span>Jennifer Hadiwibawa</span>
        <p>Secondary User</p>
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </Card>
      <Card className={styles.users} to="/manage-users/test">
        <Avatar src="https://pbs.twimg.com/profile_images/1187348463949897730/hkSeLuNh_400x400.jpg" />
        <span>Haryanti Lesmana</span>
        <p>You - Primary User</p>
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </Card>
    </section>
  );
}

function ActivityLog() {
  return (
    <section className={styles['activity-log']} id="testlist">
      <Heading>Activity Log</Heading>
      <h4>May 2019</h4>
      <div>
        <span>Michelle Lesmana purchased 30 Mbps Extra Speed</span>
        <p>21 May 2019, 12:12</p>
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </div>
      <div>
        <span>Michelle Lesmana purchased 30 Mbps Extra Speed</span>
        <p>21 May 2019, 12:12</p>
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </div>
      <h4>May 2019</h4>
      <div>
        <span>Michelle Lesmana purchased 30 Mbps Extra Speed</span>
        <p>21 May 2019, 12:12</p>
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </div>
      <div>
        <span>Michelle Lesmana purchased 30 Mbps Extra Speed</span>
        <p>21 May 2019, 12:12</p>
        <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
      </div>
    </section>
  );
}
