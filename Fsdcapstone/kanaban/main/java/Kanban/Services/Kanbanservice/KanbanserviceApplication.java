package Kanban.Services.Kanbanservice;


import jakarta.servlet.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.io.IOException;

@SpringBootApplication
@EnableFeignClients
public class KanbanserviceApplication
{

	public static void main(String[] args)
	{
		SpringApplication.run(KanbanserviceApplication.class, args);
	}


}
