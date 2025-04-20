import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'react-redux';
import { showNotification } from '../store/uiSlice';
import styled from 'styled-components';

const UpdateContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #2a2a2a;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  z-index: 1000;
`;

const UpdateButton = styled.button`
  background: #1e90ff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 10px;
`;

export const UpdateNotifier: React.FC = () => {
    const dispatch = useDispatch();
    const [updateInfo, setUpdateInfo] = React.useState<any>(null);

    useEffect(() => {
        ipcRenderer.on('update:available', (_, info) => {
            setUpdateInfo(info);
            dispatch(showNotification({
                message: `Доступно обновление ${info.version}`,
                type: 'info'
            }));
        });

        ipcRenderer.on('update:downloaded', (_, info) => {
            setUpdateInfo(info);
            dispatch(showNotification({
                message: `Обновление ${info.version} готово к установке`,
                type: 'success'
            }));
        });

        return () => {
            ipcRenderer.removeAllListeners('update:available');
            ipcRenderer.removeAllListeners('update:downloaded');
        };
    }, [dispatch]);

    const handleInstall = () => {
        ipcRenderer.send('restart-and-install');
    };

    if (!updateInfo) return null;

    return (
        <UpdateContainer>
            <h4>Доступно обновление {updateInfo.version}</h4>
            {updateInfo.releaseNotes && (
                <div dangerouslySetInnerHTML={{ __html: updateInfo.releaseNotes }} />
            )}
            <UpdateButton onClick={handleInstall}>
                Установить и перезапустить
            </UpdateButton>
        </UpdateContainer>
    );
};