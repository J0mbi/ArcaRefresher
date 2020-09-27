import styles from '../css/IPScouter.module.css';

const db = {
    KT: [
        '1.96', '1.97', '1.98', '1.99', '1.100',
        '1.101', '1.102', '1.103', '1.104', '1.105',
        '1.106', '1.107', '1.108', '1.109', '1.110',
        '1.111',
        '39.4', '39.5', '39.6', '39.7',
        '49.16', '49.17', '49.18', '49.19', '49.20',
        '49.21', '49.22', '49.23', '49.24', '49.25',
        '49.26', '49.27', '49.28', '49.29', '49.30',
        '49.31', '49.56', '49.57', '49.58', '49.59',
        '49.60', '49.61', '49.62', '49.63',
        '110.68', '110.69', '110.70', '110.71',
        '116.200', '116.201',
        '118.234', '118.235',
        '119.194',
        '163.213', '163.222', '163.229', '163.255',
        '175.216', '175.217', '175.218', '175.219', '175.220',
        '175.221', '175.222', '175.223',
    ],
    SK: [
        '27.160', '27.161', '27.162', '27.163', '27.164',
        '27.165', '27.166', '27.167', '27.168', '27.169',
        '27.170', '27.171', '27.172', '27.173', '27.174',
        '27.175', '27.176', '27.177', '27.178', '27.179',
        '27.180', '27.181', '27.182', '27.183',
        '42.16', '42.17', '42.18', '42.19', '42.20',
        '42.21', '42.22', '42.23', '42.24', '42.25',
        '42.26', '42.27', '42.28', '42.29', '42.30',
        '42.31', '42.32', '42.33', '42.34', '42.35',
        '42.36', '42.37', '42.38', '42.39', '42.40',
        '42.41', '42.42', '42.43', '42.44', '42.45',
        '42.46', '42.47',
        '58.102', '58.103',
        '111.218', '111.219',
        '113.216', '113.217',
        '114.52', '114.53',
        '123.228', '123.229',
        '124.0', '124.1', '124.2', '124.3', '124.136',
        '124.137', '124.138', '124.139',
        '180.132', '180.133', '180.134', '180.135',
        '219.252', '219.253',
        '220.103',
        '223.32', '223.33', '223.34', '223.35', '223.36',
        '223.37', '223.38', '223.39', '223.40', '223.41',
        '223.42', '223.43', '223.44', '223.45', '223.46',
        '223.47', '223.48', '223.49', '223.50', '223.51',
        '223.52', '223.53', '223.54', '223.55', '223.56',
        '223.57', '223.58', '223.59', '223.60', '223.61',
        '223.62', '223.63',
    ],
    LG: [
        '106.96', '109.97', '109.98', '109.99', '106.100',
        '106.101', '106.102', '106.103',
        '117.110', '117.111',
        '211.36',
        '223.168', '223.169', '223.170', '223.171', '223.172',
        '223.173', '223.174', '223.175',
    ],
    proxy: [
        '5.79', '5.254', '31.3', '37.58', '37.221',
        '46.28', '46.183', '50.7', '62.210', '66.249',
        '89.238', '89.238', '91.221', '94.242', '95.141',
        '103.10', '103.254', '107.167', '109.200', '176.123',
        '178.162', '178.255', '179.43', '185.9', '185.82',
        '185.104', '192.71', '192.99', '193.182', '207.244',
        '209.58',
    ],
    tor: [
        '1.161', '103.28', '103.16', '103.125', '103.194',
        '103.208', '103.214', '103.234', '103.236', '103.75',
        '104.40', '104.194', '104.196', '104.200', '104.218',
        '104.244', '107.155', '109.69', '109.70', '109.169',
        '109.194', '109.201', '109.248', '114.32', '111.90',
        '114.158', '115.73', '118.163', '119.237', '122.147',
        '123.30', '124.109', '125.212', '126.75', '128.14',
        '128.199', '128.31', '130.149', '137.74', '138.197',
        '139.162', '139.28', '139.99', '142.44', '142.58',
        '142.93', '143.202', '144.217', '145.239', '149.202',
        '151.53', '151.73', '151.77', '153.229', '154.127',
        '156.54', '157.157', '157.161', '157.230', '158.174',
        '158.69', '159.89', '160.119', '160.202', '162.213',
        '162.244', '162.247', '163.172', '164.132', '164.77',
        '166.70', '167.114', '167.86', '167.99', '169.197',
        '171.22', '171.244', '171.25', '172.96', '172.98',
        '173.14', '173.199', '173.212', '173.244', '173.255',
        '176.10', '176.126', '176.152', '176.214', '176.31',
        '176.53', '177.205', '178.128', '178.165', '178.17',
        '178.175', '178.20', '178.239', '178.254', '178.32',
        '178.9', '179.43', '179.48', '18.18', '18.85', '180.149',
        '180.150', '184.75', '185.10', '185.100', '185.103',
        '185.104', '185.107', '185.112', '185.113', '185.117',
        '185.121', '185.125', '185.127', '185.129', '185.14',
        '185.147', '185.158', '185.162', '185.165', '185.169',
        '185.175', '185.177', '185.193', '185.195', '185.203',
        '185.220', '185.222', '185.227', '185.233', '185.234',
        '185.242', '185.244', '185.248', '185.255', '185.4',
        '185.56', '185.61', '185.65', '185.66', '185.72',
        '185.86', '185.9', '186.214', '187.178', '188.166',
        '188.214', '188.65', '189.84', '190.10', '190.164',
        '190.210', '190.216', '191.114', '191.243', '191.32',
        '192.160', '192.195', '192.227', '192.34', '192.42',
        '192.68', '193.110', '193.150', '193.169', '193.201',
        '193.36', '193.56', '193.9', '193.90', '194.71',
        '194.99', '195.123', '195.176', '195.206', '195.228',
        '195.254', '196.41', '197.231', '198.167', '198.211',
        '198.46', '198.50', '198.96', '198.98', '199.127',
        '199.195', '199.249', '199.87', '200.52', '200.86',
        '200.98', '201.80', '203.78', '204.11', '204.17',
        '204.194', '204.8', '204.85', '205.168', '205.185',
        '206.248', '206.55', '207.244', '208.12', '209.126',
        '209.141', '209.95', '210.140', '210.160', '212.16',
        '212.21', '212.47', '212.75', '212.81', '213.108',
        '213.136', '213.160', '213.202', '213.252', '213.61',
        '213.95', '216.218', '216.239', '217.115', '217.12',
        '217.170', '220.135', '223.26', '23.129', '23.239',
        '24.20', '24.3', '27.122', '31.131', '31.185',
        '31.220', '31.31', '35.0', '37.128', '37.139',
        '37.187', '37.220', '37.228', '37.28', '37.48',
        '40.124', '41.215', '41.77', '45.114', '45.125',
        '45.32', '45.33', '45.35', '45.56', '45.76',
        '45.79', '46.101', '46.165', '46.166', '46.173',
        '46.182', '46.194', '46.23', '46.246', '46.29',
        '46.38', '46.98', '5.135', '5.150', '5.189',
        '5.196', '5.199', '5.2', '5.252', '5.3', '5.34',
        '5.39', '5.79', '50.247', '51.15', '51.254',
        '51.255', '51.38', '51.68', '51.75', '51.77',
        '52.167', '54.36', '54.37', '54.39', '58.153',
        '58.96', '59.127', '62.102', '62.210', '62.212',
        '62.219', '62.98', '64.113', '64.27', '65.181',
        '65.19', '66.110', '66.146', '66.155', '66.175',
        '66.42', '66.70', '67.163', '67.215', '69.162',
        '69.164', '70.168', '71.19', '72.14', '72.210',
        '72.221', '72.83', '73.15', '74.82', '77.141',
        '77.247', '77.55', '77.73', '77.81', '78.109',
        '78.142', '78.46', '79.117', '79.134', '79.141',
        '79.172', '80.127', '80.241', '80.67', '80.68',
        '80.79', '81.17', '82.118', '82.151', '82.221',
        '82.223', '82.228', '82.94', '84.19', '84.200',
        '84.209', '85.214', '85.235', '85.248', '86.123',
        '86.124', '86.127', '86.148', '87.101', '87.118',
        '87.120', '87.123', '87.247', '88.130', '88.76',
        '89.234', '89.236', '89.247', '89.31', '91.132',
        '91.146', '91.203', '91.207', '91.213', '91.219',
        '91.231', '92.116', '92.222', '92.63', '93.174',
        '93.55', '94.100', '94.102', '94.140', '94.168',
        '94.230', '94.242', '94.32', '95.128', '95.130',
        '95.142', '95.143', '95.168', '95.179', '95.211',
        '95.216', '96.66', '96.70', '97.74', '98.174',
    ],
    hola: [
        '103.18', '104.131', '106.185', '106.186', '106.187',
        '107.161', '107.170', '107.181', '107.190', '107.191',
        '107.22', '108.61', '109.74', '14.136', '149.154',
        '149.62', '151.236', '158.255', '162.217', '162.218',
        '162.221', '162.243', '167.88', '168.235', '176.58',
        '176.9', '177.67', '178.209', '178.79', '192.110',
        '192.121', '192.184', '192.211', '192.241', '192.30',
        '192.40', '192.73', '192.81', '192.99', '198.147',
        '198.58', '199.241', '208.68', '209.222', '213.229',
        '217.78', '23.227', '23.249', '23.29', '31.193',
        '37.235', '41.223', '46.17', '46.19', '46.4',
        '5.9', '50.116', '54.225', '54.243', '66.85',
        '77.237', '81.4', '85.234', '88.150', '91.186',
        '92.48', '94.76', '95.215', '96.126'],
};

export function applyScouter(rootView) {
    const ipElements = rootView.querySelectorAll('.user-info small');

    ipElements.forEach(ipElement => {
        const ip = ipElement.textContent.replace(/\(|\)/g, '');
        const [result, color] = checkIP(ip);

        ipElement.parentNode.append(<span class={color}>{` - ${result}`}</span>);
    });
}

function checkIP(ip) {
    let result = '고정';
    let color = styles.green;

    if(db.KT.indexOf(ip) > -1) {
        result = 'KT';
        color = styles.blue;
    }
    else if(db.SK.indexOf(ip) > -1) {
        result = 'SK';
        color = styles.blue;
    }
    else if(db.LG.indexOf(ip) > -1) {
        result = 'LG';
        color = styles.blue;
    }
    else if(db.proxy.indexOf(ip) > -1) {
        result = '젠메이트';
        color = styles.red;
    }
    else if(db.tor.indexOf(ip) > -1) {
        result = '토르';
        color = styles.red;
    }
    else if(db.hola.indexOf(ip) > -1) {
        result = '홀라';
        color = styles.red;
    }

    return [result, color];
}
