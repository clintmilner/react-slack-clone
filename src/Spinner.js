/**
 * User: clint
 * Date: 11/10/2018
 * Time: 08:13
 *
 * Rebasoft - Network Intelligence
 */

import React from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';


const Spinner = () => (
    <Dimmer active>
        <Loader size='huge' content={"Preparing Chat..."}/>
    </Dimmer>

);

export default Spinner;