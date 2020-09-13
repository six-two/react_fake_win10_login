import React from 'react';
import { connect } from 'react-redux';
import { ReduxState, UserInfo } from '../../redux/store';
import { selectUser } from '../../redux/actions';


const UserList = (props: Props) => {
    if (props.users.length < 2) {
        return null;
    } else {
        return <div className="user-list">
            {props.users.map((user: UserInfo, index: number) => {
                let className = "entry";
                let onClick: ((e: any) => void) | undefined;
                if (index === props.selectedIndex) {
                    className += " selected";
                } else {
                    onClick = (e: any) => selectUser(index);
                }
                return <div
                    key={index}
                    className={className}
                    onClick={onClick}>
                    <img className="icon" src={user.iconUrl} alt="" />
                    <div className="name">
                        {user.name}
                    </div>
                </div>
            })}
        </div>
    }
}

interface Props {
    selectedIndex: number,
    users: UserInfo[],
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
    return {
        ...ownProps,
        selectedIndex: state.var.login.selectedUser.index,
        users: state.const.users,
    };
};

const ReduxUserList = connect(mapStateToProps)(UserList);
export default ReduxUserList;
