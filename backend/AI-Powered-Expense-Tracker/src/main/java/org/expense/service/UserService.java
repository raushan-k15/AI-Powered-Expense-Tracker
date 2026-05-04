package org.expense.service;

import org.expense.dto.LoginRequest;
import org.expense.dto.RegisterRequest;

public interface UserService {
	String register(RegisterRequest request);

    String login(LoginRequest request);
}
