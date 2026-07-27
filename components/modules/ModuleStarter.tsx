import cn from 'classnames';

import React from 'react';
import Container from '../Container';

interface ModuleStarterProps {
  module: any;
}

const ModuleStarter: React.FC<ModuleStarterProps> = ({ module }) => {
  return (
    <Container>
      <div></div>
    </Container>
  );
};

export default ModuleStarter;
