import { useCallback } from 'react';
import classNames from 'classnames';

import { useActiveConfigurator, useConfigurator } from '@/hooks';
import { Button, Icon } from '@/components/atoms';
import { HomeSetting } from '@/components/organisms';

export const Configurator = () => {
  const [openConfigurator, setCloseConfigurator] = useConfigurator();
  const [activeConfigurator,] = useActiveConfigurator();

  const _renderItem = useCallback((key:string) => {
    switch (key) {
    case 'users-active':
      return <HomeSetting />;
    default:
      return null;
    }
  }, []);

  return (
    <aside
      className={classNames('fixed top-0 right-0 z-50 h-screen w-96 bg-white shadow-lg transition-transform duration-300', {
        'translate-x-0': openConfigurator,
        'translate-x-96': !openConfigurator
      })}
    >
      <div className="flex justify-end p-5">
        <Button
          variant="text"
          className="justify-end max-w-[25px]"
          onClick={setCloseConfigurator}
        >
          <Icon name="xmark" type="solid"/>
        </Button>
      </div>
      <div className="overflow-y-auto h-full px-5 pb-16">
        {_renderItem(activeConfigurator)}
      </div>
    </aside>
  );
};

