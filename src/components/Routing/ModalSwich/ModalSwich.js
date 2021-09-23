/* eslint-disable react/no-children-prop */
import LogIn from '../../pages/LogInPage';
import CreatingEditingPage from '../../ToDoList/ItemTask/CreatingEditingPage';
import Redistration from '../../pages/RagisttrationPage';
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../../fireBase/FireBasenItialization';
import TasksPage from '../../pages/TasksPage';

export default function ModalSwitch() {
    const [status, setStatus] = useState();

    onAuthStateChanged(auth, user => {
        user ? setStatus(user.uid) : setStatus(null);
    });

    return (
        <div>
            <Switch>
                {!status ? (
                    <>
                        <Route path="/" exact children={<LogIn />} />
                        <Route path="/register" children={<Redistration />} />
                    </>
                ) : (
                    <>
                        <Route path="/" exact children={<TasksPage user={status} />} />
                        <Route
                            path="/item_task:id"
                            children={<CreatingEditingPage user={status} />}
                        />
                    </>
                )}
            </Switch>
        </div>
    );
}