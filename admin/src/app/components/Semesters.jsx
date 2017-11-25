import React from 'react';
import {getDateWithoutTime} from '../services/functions.js';

class Semesters extends React.Component {
    render() {
        const semesters = this.props.semesters.map((s) => 
            <div key={s.id} className="columns">
                <div className="column">
                    <p>学期: {s.semester}</p>
                    <p>开学日期: {s.school_start_date}</p>
                </div>
                <div className="column">
                    学费: {s.fee}<br/>
                    进度: {s.progress_name}<br/>
                    佣金申报: {s.commission_progress_name}
                </div>
                <div className="column">
                    备注: {s.remark}
                </div>
                <div className="column">
                    修改日期: {getDateWithoutTime(s.updated_at)}<br/>
                    最后修改: {s.last_modified_name}
                </div>
            </div>
        );
        return (
            <div className="card">
                {semesters}
            </div>
        );
    }
}
export default Semesters;